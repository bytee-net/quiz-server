const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  kind: {
    type: String,
    enum: ['single', 'multiple', 'text'],
    required: [true, 'Type of Question is required'],
  },
  email: String,
  tags: [[String]],
  code_block: String,
  difficulty: {
    type: Number,
    min: 0,
    max: 10,
  },
  answers: [
    {content: String, explanation: String},
  ],
  resolution: [mongoose.Schema.Types.Mixed],
  explanation: String,
  created: Date,
  updated: {
    type: Date,
    default: Date.now,
  },
  published: {
    type: Boolean,
    required: true,
  }
});

const QuestionModel = mongoose.model('Question', QuestionSchema);

module.exports = QuestionModel;
