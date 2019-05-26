const express = require('express');
const router = express.Router();

const QuestionModel = require('../models/question');

/* GET questions listing. */
router.get(['/', '/:category'], async (req, res, next) => {
  const category = req.params.category;

  // Only published questions
  let filter = {
    published: true,
  };

  if (category) {
    filter.category = category;
  }

  const questions = await QuestionModel.find(filter).exec();

  res.json(questions);
});

module.exports = router;
