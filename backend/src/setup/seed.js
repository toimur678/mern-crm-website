require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function seedData() {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log('✅ Connected to MongoDB');

    const Admin = require('../models/coreModels/Admin');
    const Client = require('../models/appModels/Client');
    const Invoice = require('../models/appModels/Invoice');
    const Payment = require('../models/appModels/Payment');
    
    const admin = await Admin.findOne({ email: 'admin@admin.com' });
    if (!admin) {
      throw new Error('Admin not found! Please run npm run setup first.');
    }
    const adminId = admin._id;

    console.log('👤 Creating Clients...');
    const clientsData = [
      { name: 'Acme Corporation', email: 'contact@acme.com', phone: '555-0100', country: 'US', address: '123 Acme Way' },
      { name: 'Global Tech', email: 'hello@globaltech.com', phone: '555-0101', country: 'UK', address: '456 Tech Park' },
      { name: 'Wayne Enterprises', email: 'info@wayne.com', phone: '555-0102', country: 'US', address: '1007 Mountain Drive' },
      { name: 'Stark Industries', email: 'contact@stark.com', phone: '555-0103', country: 'US', address: '200 Park Avenue' },
      { name: 'Massive Dynamic', email: 'sales@massive.com', phone: '555-0104', country: 'US', address: '650 Madison Ave' },
      { name: 'Umbrella Corp', email: 'info@umbrella.com', phone: '555-0105', country: 'UK', address: '54 Raccoon City' },
      { name: 'Initech', email: 'contact@initech.com', phone: '555-0106', country: 'US', address: '1 Initech Blvd' },
      { name: 'Aperture Science', email: 'hello@aperture.com', phone: '555-0107', country: 'US', address: '1 Science Way' },
      { name: 'Cyberdyne Systems', email: 'info@cyberdyne.com', phone: '555-0108', country: 'US', address: '1814 Sunnyvale' },
      { name: 'Oscorp', email: 'contact@oscorp.com', phone: '555-0109', country: 'US', address: 'Oscorp Tower' }
    ].map(c => ({ ...c, createdBy: adminId }));

    const clients = await Client.insertMany(clientsData);
    console.log(`✅ Created ${clients.length} clients.`);

    console.log('🧾 Creating Invoices and Payments...');
    const year = new Date().getFullYear();
    let invoiceNumber = 1001;
    let paymentNumber = 5001;
    let invoicesCreated = 0;
    let paymentsCreated = 0;
    
    for (const client of clients) {
      // Create 1 to 3 invoices per client
      const numInvoices = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numInvoices; i++) {
        const itemPrice = Math.floor(Math.random() * 1000) + 100;
        const itemQuantity = Math.floor(Math.random() * 5) + 1;
        const totalAmount = itemPrice * itemQuantity;
        
        // Random status
        const statuses = ['draft', 'pending', 'sent'];
        const isPaid = Math.random() > 0.5; // 50% chance the invoice is paid
        const currentStatus = isPaid ? 'sent' : statuses[Math.floor(Math.random() * statuses.length)];
        
        const invoiceData = {
          createdBy: adminId,
          number: invoiceNumber++,
          year,
          date: new Date(),
          expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
          client: client._id,
          items: [{
            itemName: 'Consulting Services',
            description: 'Monthly consulting fee',
            quantity: itemQuantity,
            price: itemPrice,
            total: totalAmount
          }],
          taxRate: 0,
          subTotal: totalAmount,
          taxTotal: 0,
          total: totalAmount,
          currency: 'USD',
          credit: isPaid ? totalAmount : 0,
          paymentStatus: isPaid ? 'paid' : 'unpaid',
          status: currentStatus,
        };
        
        const invoice = await new Invoice(invoiceData).save();
        invoicesCreated++;
        
        if (isPaid) {
          const paymentData = {
            createdBy: adminId,
            number: paymentNumber++,
            client: client._id,
            invoice: invoice._id,
            date: new Date(),
            amount: totalAmount,
            currency: 'USD',
            ref: 'TRX-' + Math.floor(Math.random() * 100000),
            description: 'Payment for invoice #' + invoice.number
          };
          const payment = await new Payment(paymentData).save();
          
          // update invoice with payment reference
          invoice.payment.push(payment._id);
          await invoice.save();
          paymentsCreated++;
        }
      }
    }
    
    console.log(`✅ Created ${invoicesCreated} invoices and ${paymentsCreated} payments.`);
    console.log('🎉 Seed completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
}

seedData();
