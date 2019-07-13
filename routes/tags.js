const express = require('express');
const router = express.Router();

const QuestionModel = require('../models/question');

/* GET distinct tags */
router.get('/', async (req, res, next) => {
  const tags = await QuestionModel.aggregate(
    [
      {$group: {"_id": "$tags", "count": {$sum: 1}}},
      {$unwind: '$_id'},
      {$unwind: '$_id'},
    ],
  );

  res.json(tags);
});

module.exports = router;
