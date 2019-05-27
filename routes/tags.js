const express = require('express');
const router = express.Router();

const QuestionModel = require('../models/question');

/* GET tags categories. */
router.get('/', async (req, res, next) => {
  let filter = {};

  // Apply published filter for requests
  if (!req.authenticated) {
    filter.published = true;
  }

  const tags = await QuestionModel.distinct('tags').exec();

  res.json(tags);
});

module.exports = router;
