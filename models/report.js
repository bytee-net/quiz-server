const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  comment: {
    type: String,
    required: [true, 'Comment is required.'],
  },
  question: {
    type: String,
    required: [true, 'Question is required.'],
  },
  created: Date,
  updated: {
    type: Date,
    default: Date.now,
  },
});

const ReportModel = mongoose.model('Report', ReportSchema);

module.exports = ReportModel;
