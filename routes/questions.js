const express = require('express');
const router = express.Router();

const QuestionModel = require('../models/question');

/* GET questions listing. */
router.get(['/', '/:category', '/tags/:tags'], async (req, res, next) => {
  const category = req.params.category;
  let tags = req.params.tags;

  let filter = {};

  // Apply published filter for requests
  if (!req.authenticated) {
    filter.published = true;
  }

  if (category) {
    filter.category = category;
  }

  if (tags) {
    tags = tags.split(',');

    if (tags.length > 1) {
      filter.$or = [];

      tags.forEach((item) => {
        filter.$or.push({tags: [item.trim()]});
      });
    } else {
      filter.tags = tags;
    }
  }

  const questions = await QuestionModel.find(filter).exec();

  res.json(questions);
});

/**
 * Store questions
 */
router.post('/', async (req, res, next) => {
  if (!req.authenticated) {
    return res.status(401).json('Unauthorized access');
  }

  if (!req.body.length) {
    return res.status(405).json('Invalid input');
  }

  let counter = 0;

  try {
    for (let item of req.body) {
      let question = await new QuestionModel(item);

      question.published = true;
      question.created = Date.now();

      await question.validate();
      await question.save();

      counter++;
    }
  } catch (err) {
    return res.status(500).json({msg: 'Validation failed.', error: err});
  }

  res.json({msg: 'Questions stored.', count: counter});
});

module.exports = router;
