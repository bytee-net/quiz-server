const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const apiKeyAuth = require('./middleware/auth');
const mongoHelper = require('./helpers/MongoHelper');

const indexRouter = require('./routes/index');
const questionRoute = require('./routes/questions');
const reportRoute = require('./routes/report');
const suggestRoute = require('./routes/suggest');
const statsRoute = require('./routes/stats');

const mongoDb = mongoHelper.getUrl();
mongoose.connect(mongoDb, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(apiKeyAuth);

app.use('/', indexRouter);
app.use('/questions', questionRoute);
app.use('/questions/:category', questionRoute);
app.use('/report', reportRoute);
app.use('/suggest', suggestRoute);
app.use('/stats', statsRoute);

// Error handler
app.get('*', (req, res) => {
  res.status(404).json({'error': 'Unknown route'});
});

module.exports = app;
