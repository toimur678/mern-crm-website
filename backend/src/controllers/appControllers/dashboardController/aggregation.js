const EXCLUDED_STATUSES = ['draft', 'cancelled', 'refunded'];

function parseDashboardQuery(query = {}) {
  if (query.currency !== undefined && typeof query.currency !== 'string') {
    return { error: 'Currency must be a three-letter currency code.' };
  }
  const currency = query.currency === undefined ? 'USD' : query.currency.toUpperCase();
  if (query.period !== undefined && !['string', 'number'].includes(typeof query.period)) {
    return { error: 'Period must be either 6 or 12 months.' };
  }
  const period = query.period === undefined ? 6 : Number(query.period);

  if (!/^[A-Z]{3}$/.test(currency)) {
    return { error: 'Currency must be a three-letter currency code.' };
  }
  if (![6, 12].includes(period)) {
    return { error: 'Period must be either 6 or 12 months.' };
  }
  return { currency, period };
}

function monthWindow(period, now = new Date()) {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - period + 1, 1));
  const end = new Date(now);
  const months = Array.from({ length: period }, (_, index) => {
    const date = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + index, 1));
    return { month: date.toISOString().slice(0, 7), invoiced: 0, collected: 0 };
  });
  return { start, end, months };
}

function mergeMonthlyTotals(months, invoices = [], payments = []) {
  const invoiceMap = new Map(invoices.map((item) => [item._id, item.total]));
  const paymentMap = new Map(payments.map((item) => [item._id, item.total]));
  return months.map((item) => ({
    ...item,
    invoiced: invoiceMap.get(item.month) || 0,
    collected: paymentMap.get(item.month) || 0,
  }));
}

function invoicePipeline({ currency, start, end, clientCollection, now = new Date() }) {
  // An invoice is overdue only after its due calendar day has finished (UTC).
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  return [
    { $match: { removed: false, currency, status: { $nin: EXCLUDED_STATUSES } } },
    {
      $addFields: {
        netTotal: { $max: [{ $subtract: ['$total', { $ifNull: ['$discount', 0] }] }, 0] },
      },
    },
    {
      $addFields: {
        balance: { $max: [{ $subtract: ['$netTotal', { $ifNull: ['$credit', 0] }] }, 0] },
      },
    },
    {
      $facet: {
        totals: [
          {
            $group: {
              _id: null,
              invoiced: { $sum: '$netTotal' },
              invoiceCount: { $sum: 1 },
              outstanding: { $sum: '$balance' },
              outstandingCount: { $sum: { $cond: [{ $gt: ['$balance', 0] }, 1, 0] } },
              overdue: {
                $sum: {
                  $cond: [
                    { $and: [{ $gt: ['$balance', 0] }, { $lt: ['$expiredDate', today] }] },
                    '$balance',
                    0,
                  ],
                },
              },
              overdueCount: {
                $sum: {
                  $cond: [
                    { $and: [{ $gt: ['$balance', 0] }, { $lt: ['$expiredDate', today] }] },
                    1,
                    0,
                  ],
                },
              },
              paidCount: { $sum: { $cond: [{ $eq: ['$balance', 0] }, 1, 0] } },
              partialCount: {
                $sum: {
                  $cond: [{ $and: [{ $gt: ['$balance', 0] }, { $gt: ['$credit', 0] }] }, 1, 0],
                },
              },
            },
          },
        ],
        monthly: [
          { $match: { date: { $gte: start, $lte: end } } },
          {
            $group: {
              _id: { $dateToString: { format: '%Y-%m', date: '$date', timezone: 'UTC' } },
              total: { $sum: '$netTotal' },
            },
          },
        ],
        recent: [
          { $sort: { date: -1, created: -1, _id: -1 } },
          { $limit: 5 },
          {
            $lookup: {
              from: clientCollection,
              localField: 'client',
              foreignField: '_id',
              as: 'client',
            },
          },
          {
            $project: {
              number: 1,
              year: 1,
              date: 1,
              expiredDate: 1,
              total: '$netTotal',
              balance: 1,
              currency: 1,
              status: 1,
              paymentStatus: 1,
              overdue: { $and: [{ $gt: ['$balance', 0] }, { $lt: ['$expiredDate', today] }] },
              client: { $arrayElemAt: ['$client.name', 0] },
            },
          },
        ],
      },
    },
  ];
}

function paymentPipeline({ currency, start, end, clientCollection, invoiceCollection }) {
  return [
    { $match: { removed: false, currency } },
    {
      $facet: {
        totals: [{ $group: { _id: null, collected: { $sum: '$amount' }, paymentCount: { $sum: 1 } } }],
        monthly: [
          { $match: { date: { $gte: start, $lte: end } } },
          {
            $group: {
              _id: { $dateToString: { format: '%Y-%m', date: '$date', timezone: 'UTC' } },
              total: { $sum: '$amount' },
            },
          },
        ],
        recent: [
          { $sort: { date: -1, created: -1, _id: -1 } },
          { $limit: 5 },
          {
            $lookup: {
              from: clientCollection,
              localField: 'client',
              foreignField: '_id',
              as: 'client',
            },
          },
          {
            $lookup: {
              from: invoiceCollection,
              localField: 'invoice',
              foreignField: '_id',
              as: 'invoice',
            },
          },
          {
            $project: {
              number: 1,
              date: 1,
              amount: 1,
              currency: 1,
              ref: 1,
              client: { $arrayElemAt: ['$client.name', 0] },
              invoiceNumber: { $arrayElemAt: ['$invoice.number', 0] },
            },
          },
        ],
      },
    },
  ];
}

module.exports = { parseDashboardQuery, monthWindow, mergeMonthlyTotals, invoicePipeline, paymentPipeline };
