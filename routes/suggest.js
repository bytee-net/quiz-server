const express = require('express');
const router = express.Router();

const mailHelper = require('../helpers/MailHelper');
const QuestionModel = require('../models/question');

/* POST suggest listing. */
router.post('/', async (req, res, next) => {
  // Set it to unpublished
  req.body.published = false;
  req.body.created = Date.now();

  let suggestion = await new QuestionModel(req.body);

  try {
    await suggestion.validate();
    const newSuggestion = await suggestion.save();

    // Simple admin notification
    mailHelper.notifyAdmin('New suggestion for Quiz', JSON.stringify(newSuggestion));

    res.status(200).json(newSuggestion);
  } catch (err) {
    return res.status(405).json({message: 'Invalid input', error: err})
  }
});

module.exports = router;
