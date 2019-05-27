const express = require('express');
const router = express.Router();

const QuestionModel = require('../models/question');

/* GET distinct categories. */
router.get('/', async (req, res, next) => {
  let filter = {};

  // Apply published filter for requests
  if (!req.authenticated) {
    filter.published = true;
  }

  const categories = await QuestionModel.distinct('category').exec();

  res.json(categories);
});

module.exports = router;
