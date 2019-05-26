const express = require('express');
const router = express.Router();

const QuestionModel = require('../models/question');

/* POST suggest listing. */
router.post('/', async (req, res, next) => {
  // Set it to unpublished
  req.body.published = false;
  req.body.created = Date.now();

  let suggestion = await new QuestionModel(req.body);

  try {
    await suggestion.validate();
    let newSuggestion = await suggestion.save();

    res.status(200).json(newSuggestion);
  } catch (err) {
    return res.status(405).json({message: 'Invalid input', error: err})
  }
});

module.exports = router;
