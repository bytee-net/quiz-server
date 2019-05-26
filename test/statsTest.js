const helper = require('./base');

const api = helper.api;
const path = helper.config.prefix + '/stats';

const sampleStats = [{
  "_id": "5cea428e63300c489d0bb241",
  "title": "Which of the following will print your current directory position on the shell?",
  "explanation": "",
  "code_block": "",
  "kind": "multiple",
  "difficulty": "4",
  "answers": [{"content": "echo PWD", "explanation": "This is going to output PWD as text."}, {
    "content": "echo $(pwd)",
    "explanation": "Yes, you can use the command substitution mode with echo to get the current working directory."
  }, {
    "content": "pwd",
    "explanation": "The pwd command prints out the current working directory."
  }, {
    "content": "echo $PWD",
    "explanation": "The Environment Variable PWD contains the current working directory."
  }, {
    "content": "whereis",
    "explanation": "whereis locates binary, source and the manual page files for a command."
  }, {"content": "w", "explanation": "w prints the current logged in users"}],
  "category": "lpic-101",
  "tags": ["bash"],
  "resolution": [1, 2, 3],
  "index": 0,
  "answer": [1, 2, 3],
  "isCorrect": true
}, {
  "_id": "5cea428e63300c489d0bb241",
  "title": "Which Environment Variable holds the language configuration for the shell? (Name only)",
  "explanation": "LANG is the correct answer, you can print it with echo $LANG",
  "code_block": "",
  "kind": "text",
  "difficulty": "4",
  "answers": [],
  "resolution": ["LANG"],
  "category": "lpic-101",
  "tags": ["Bash"],
  "index": 1,
  "answer": "",
  "isCorrect": false
}];

/**
 * Test suite for /stats
 */
describe('POST /stats', () => {
  it('Should only accept post', async () => {
    const result = await api
      .get(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send();

    result.type.should.equal('application/json');
    result.statusCode.should.equal(404);
  });

  it('Should throw an error on invalid input', async () => {
    const request = {
      test: 42,
    };

    const result = await api
      .post(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(request);

    result.type.should.equal('application/json');
    result.statusCode.should.equal(405);
  });

  it('Should 200 to an valid request', async () => {
    const result = await api
      .post(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(sampleStats);

    result.statusCode.should.equal(200);
    result.body.should.be.a('object');

    result.body.msg.should.be.a('string');
    result.body.msg.should.equal('Statistics submitted.');
  });
});
