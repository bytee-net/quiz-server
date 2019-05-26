const express = require('express');
const router = express.Router();

const ReportModel = require('../models/report');

/* POST report */
router.post('/', async (req, res, next) => {
  req.body.created = Date.now();

  let report = await new ReportModel(req.body);

  try {
    await report.validate();
    let newReport = await report.save();

    res.status(200).json(newReport);
  } catch (err) {
    return res.status(405).json({message: 'Invalid input', error: err})
  }
});

module.exports = router;
