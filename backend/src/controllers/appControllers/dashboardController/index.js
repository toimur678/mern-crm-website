const mongoose = require('mongoose');
const {
  parseDashboardQuery,
  monthWindow,
  mergeMonthlyTotals,
  invoicePipeline,
  paymentPipeline,
} = require('./aggregation');

const summary = async (req, res) => {
  const options = parseDashboardQuery(req.query);
  if (options.error) {
    return res.status(400).json({ success: false, result: null, message: options.error });
  }

  const Invoice = mongoose.model('Invoice');
  const Payment = mongoose.model('Payment');
  const Client = mongoose.model('Client');
  const now = new Date();
  const { start, end, months } = monthWindow(options.period, now);
  const pipelineOptions = {
    ...options,
    start,
    end,
    now,
    clientCollection: Client.collection.name,
    invoiceCollection: Invoice.collection.name,
  };

  const [invoiceResult, paymentResult, activeClients, invoiceCurrencies, paymentCurrencies] =
    await Promise.all([
      Invoice.aggregate(invoicePipeline(pipelineOptions)),
      Payment.aggregate(paymentPipeline(pipelineOptions)),
      Client.countDocuments({ removed: false, enabled: true }),
      Invoice.distinct('currency', { removed: false }),
      Payment.distinct('currency', { removed: false }),
    ]);

  const invoices = invoiceResult[0] || {};
  const payments = paymentResult[0] || {};
  const invoiceTotals = invoices.totals?.[0] || {};
  const paymentTotals = payments.totals?.[0] || {};
  const metrics = {
    invoiced: invoiceTotals.invoiced || 0,
    invoiceCount: invoiceTotals.invoiceCount || 0,
    outstanding: invoiceTotals.outstanding || 0,
    outstandingCount: invoiceTotals.outstandingCount || 0,
    overdue: invoiceTotals.overdue || 0,
    overdueCount: invoiceTotals.overdueCount || 0,
    paidCount: invoiceTotals.paidCount || 0,
    partialCount: invoiceTotals.partialCount || 0,
    collected: paymentTotals.collected || 0,
    paymentCount: paymentTotals.paymentCount || 0,
    activeClients,
  };
  metrics.unpaidCount = metrics.invoiceCount - metrics.paidCount - metrics.partialCount;

  return res.status(200).json({
    success: true,
    result: {
      currency: options.currency,
      period: options.period,
      updatedAt: now.toISOString(),
      availableCurrencies: [...new Set([options.currency, ...invoiceCurrencies, ...paymentCurrencies])]
        .filter((currency) => /^[A-Z]{3}$/.test(currency))
        .sort(),
      metrics,
      monthly: mergeMonthlyTotals(months, invoices.monthly, payments.monthly),
      recentInvoices: invoices.recent || [],
      recentPayments: payments.recent || [],
    },
    message: 'Dashboard summary loaded successfully.',
  });
};

module.exports = { summary };
