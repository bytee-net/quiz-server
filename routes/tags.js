const express = require('express');
const router = express.Router();

const QuestionModel = require('../models/question');

/* GET distinct tags */
router.get('/', async (req, res, next) => {
  const tags_raw = await QuestionModel.aggregate(
    [
      {$match: {"published": true}},
      {$group: {"_id": "$tags", "count": {$sum: 1}}},
      {$unwind: '$_id'},
      {$unwind: '$_id'},
    ],
  );

  // Simple reduction hack, as aggregate on arrays not reducing, probably also possible in mongoose
  const tags = [];

  // Reduce not working here
  tags_raw.forEach((item) => {
    let exists = false;

    tags.forEach((tag) => {
      if (tag._id === item._id) {
        tag.count += item.count;
        exists = true;
      }
    });

    if (exists) {
      return;
    }

    tags.push(item);
  });

  // const tags = await QuestionModel.distinct("tags");

  res.json(tags);
});

module.exports = router;
