/**
 * Simple question import to mongodb. Supply filename(s) of JSON questions separated by space.
 */
const mongoose = require('mongoose');
const fs = require('fs');

const mongoHelper = require('./helpers/MongoHelper');
const QuestionModel = require('./models/question');

const mongoDb = mongoHelper.getUrl();
mongoose.connect(mongoDb, {useNewUrlParser: true});

const args = process.argv.slice(2);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/**
 * Saves the questions to the database.
 *
 * @param file {String} Single question file
 * @returns {Promise<void>}
 */
let importFile = async (file) => {
  let questions = await JSON.parse(fs.readFileSync(file));

  if (!questions.length) {
    return;
  }

  let counter = 0;

  for (let item of questions) {
    item.published = true;
    item.created = Date.now();

    try {
      let question = await new QuestionModel(item);

      await question.validate();
      await question.save();
    } catch (err) {
      console.log('Err');
      console.log(err);
      return;
    }

    counter++;
  }

  console.log(`${counter} Questions for ${file} saved.`)
};

const importQuestions = async (args) => {
  for (let arg of args) {
    await importFile(arg);
  }

  db.close();
};

importQuestions(args);
