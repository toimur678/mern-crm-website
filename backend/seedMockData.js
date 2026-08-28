const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

// Models
const Admin = require('./src/models/coreModels/Admin');
const Client = require('./src/models/appModels/Client');
const Invoice = require('./src/models/appModels/Invoice');
const Payment = require('./src/models/appModels/Payment');

async function seedData() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.DATABASE);
    console.log('Connected.');

    const admin = await Admin.findOne();
    if (!admin) {
      console.log('No admin found. Cannot proceed.');
      process.exit(1);
    }
    const adminId = admin._id;

    console.log('Generating Clients...');
    const clients = [];
    for (let i = 0; i < 15; i++) {
      const client = new Client({
        name: faker.company.name(),
        phone: faker.phone.number(),
        country: faker.location.country(),
        address: faker.location.streetAddress(),
        email: faker.internet.email(),
        createdBy: adminId,
        created: faker.date.past({ years: 1 })
      });
      await client.save();
      clients.push(client);
    }
    console.log(`Generated ${clients.length} Clients.`);

    console.log('Generating Invoices...');
    const invoices = [];
    let invoiceNumber = 1000;
    
    for (let i = 0; i < 30; i++) {
      const client = faker.helpers.arrayElement(clients);
      
      const numItems = faker.number.int({ min: 1, max: 4 });
      const items = [];
      let subTotal = 0;
      
      for (let j = 0; j < numItems; j++) {
        const quantity = faker.number.int({ min: 1, max: 10 });
        const price = faker.number.int({ min: 50, max: 1500 });
        const total = quantity * price;
        subTotal += total;
        
        items.push({
          itemName: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          quantity,
          price,
          total
        });
      }
      
      const taxRate = faker.helpers.arrayElement([0, 0.05, 0.1, 0.2]);
      const taxTotal = subTotal * taxRate;
      const total = subTotal + taxTotal;
      
      const date = faker.date.recent({ days: 60 });
      const expiredDate = new Date(date);
      expiredDate.setDate(expiredDate.getDate() + 30);
      
      const status = faker.helpers.arrayElement(['draft', 'pending', 'sent']);

      const invoice = new Invoice({
        createdBy: adminId,
        number: invoiceNumber++,
        year: date.getFullYear(),
        date,
        expiredDate,
        client: client._id,
        items,
        taxRate,
        subTotal,
        taxTotal,
        total,
        currency: 'USD',
        status,
        paymentStatus: 'unpaid',
      });
      
      await invoice.save();
      invoices.push(invoice);
    }
    console.log(`Generated ${invoices.length} Invoices.`);

    console.log('Generating Payments...');
    const payments = [];
    let paymentNumber = 1000;
    
    // Make payments for half of the invoices
    const invoicesToPay = faker.helpers.arrayElements(invoices, 15);
    
    for (const invoice of invoicesToPay) {
      // randomly decide partial or full payment
      const isPartial = faker.datatype.boolean();
      const amount = isPartial ? invoice.total / 2 : invoice.total;
      
      const payment = new Payment({
        createdBy: adminId,
        number: paymentNumber++,
        client: invoice.client,
        invoice: invoice._id,
        date: faker.date.between({ from: invoice.date, to: new Date() }),
        amount,
        currency: 'USD',
        ref: faker.finance.transactionDescription(),
        description: 'Payment for services',
      });
      
      await payment.save();
      payments.push(payment);
      
      // Update invoice payment status
      invoice.paymentStatus = isPartial ? 'partially' : 'paid';
      invoice.credit = (invoice.credit || 0) + amount;
      await invoice.save();
    }
    console.log(`Generated ${payments.length} Payments.`);

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

seedData();
