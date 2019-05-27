const express = require('express');
const router = express.Router();

const QuestionModel = require('../models/question');

/* GET distinct tags */
router.get('/', async (req, res, next) => {
  const tags = await QuestionModel.distinct('tags').exec();

  res.json(tags);
});

module.exports = router;
