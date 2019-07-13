const express = require('express');
const router = express.Router();

const QuestionModel = require('../models/question');

/* GET distinct categories. */
router.get('/', async (req, res, next) => {
  // const categories = await QuestionModel.distinct('category').exec();

  const categories = await QuestionModel.aggregate(
    [
      {$group: {"_id": "$category", "count": {$sum: 1}}},
    ],
  );

  res.json(categories);
});

module.exports = router;
