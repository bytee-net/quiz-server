const express = require('express');
const uuid = require('uuid/v1');
const router = express.Router();

const StatisticModel = require('../models/statistic');

/* Post statistics */
router.post('/', async (req, res, next) => {
  // Body is an array of questions
  if (!req.body.length) {
    return res.status(405).json('Invalid input');
  }

  // Unique identifier for this test
  const testUuid = uuid();

  req.body.forEach(async (item) => {
    let stat = await new StatisticModel ({
      uuid: testUuid,
      question: item._id,
      correct: item.isCorrect,
      answer: item.answer
    });

    try {
      await stat.validate();
      await stat.save();
    } catch (err) {
      return res.status(405).json({message: 'Invalid input', error: err})
    }
  });

  res.json({msg: 'Statistics submitted.'});
});

module.exports = router;
