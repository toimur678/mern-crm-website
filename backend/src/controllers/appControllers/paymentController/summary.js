const mongoose = require('mongoose');
const Model = mongoose.model('Payment');

const summary = async (req, res) => {
  let defaultType = 'month';

  const { type } = req.query;

  if (type) {
    if (['week', 'month', 'year'].includes(type)) {
      defaultType = type;
    } else {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Invalid type',
      });
    }
  }

  const result = await Model.aggregate([
    {
      $match: {
        removed: false,
      },
    },
    {
      $group: {
        _id: null,
        count: {
          $sum: 1,
        },
        total: {
          $sum: '$amount',
        },
      },
    },
    {
      $project: {
        _id: 0,
        count: 1,
        total: 1,
      },
    },
  ]);

  return res.status(200).json({
    success: true,
    result: result.length > 0 ? result[0] : { count: 0, total: 0 },
    message: `Successfully fetched the summary of payment invoices for the last ${defaultType}`,
  });
};

module.exports = summary;
