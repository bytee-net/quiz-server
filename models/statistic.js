const mongoose = require('mongoose');

const StatisticSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: [true, 'UUid is required.'],
  },
  question: {
    type: String,
    required: [true, 'Question is required.'],
  },
  answer: [[String]],
  correct: {
    type: Boolean,
    required: [true, 'Status is required'],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const StatisticModel = mongoose.model('Statistic', StatisticSchema);

module.exports = StatisticModel;
