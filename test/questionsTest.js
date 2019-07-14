const helper = require('./base');

// Supertest API Wrapper
const api = helper.api;
const path = helper.config.prefix + '/questions';

/**
 * Test suite for /questions
 */
describe('Tests for /questions', () => {
  it('Should return json and an array', async () => {
    let result = await api
      .get(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send();

    result.type.should.equal('application/json');
    result.statusCode.should.equal(200);
    result.body.should.be.a('array');
  });

  it('Works with an category', async () => {
    let category = 'lpic-101';

    let result = await api
      .get(path + '/' + category)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send();

    result.type.should.equal('application/json');
    result.statusCode.should.equal(200);
    result.body.should.be.a('array');

    // Only returns questions in the category
    result.body.forEach((item) => {
      item.category.should.equal(category);
      item.published.should.be = true;
    });
  });

  it('Works with tags', async () => {
    let tags = ['Regex' , 'samba'];

    let result = await api
      .get(path + '/tags/' + tags.join(','))
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send();

    result.type.should.equal('application/json');
    result.statusCode.should.equal(200);
    result.body.should.be.a('array');

    // Only returns questions with one of the tags (or both)
    result.body.forEach((item) => {
      tags.should.to.be.containingAnyOf(item.tags[0]);
      item.published.should.be = true;
    });
  });

  it('Should only return published questions.', async () => {
    let result = await api
      .get(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send();

    result.body.forEach((item) => {
      item.published.should.equal(true);
    });
  });

  it('Post should only be available to admin.', async () => {
    let result = await api
      .post(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({});

    result.type.should.equal('application/json');
    result.statusCode.should.equal(401);
  });

  it('Wrongly formatted questions should fail.', async () => {
    const wrongQuestion = [
      {
        "title": "Test",
      }
    ];

    let result = await api
      .post(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set({'api-key': helper.config.apiKey})
      .send(wrongQuestion);

    result.type.should.equal('application/json');
    result.statusCode.should.equal(500);
  });

  it('Valid Questions should be saved.', async () => {
    const validQuestions = [
      {
        "title": "The dot \".\" in a regex matches a single character?",
        "explanation": "",
        "code_block": "",
        "kind": "single",
        "difficulty": "3",
        "answers": [
          {
            "content": "True",
            "explanation": "The dot matches any single character."
          },
          {
            "content": "False",
            "explanation": "No."
          }
        ],
        "category": "lpic-101",
        "tags": ["Regex"],
        "resolution": [
          0
        ]
      },
      {
        "title": "Which operator matches the end of lines in an regex?",
        "explanation": "The $ matches the end of lines.",
        "code_block": "",
        "kind": "text",
        "difficulty": "7",
        "answers": [],
        "category": "lpic-101",
        "tags": ["Regex"],
        "resolution": [
          "$"
        ]
      }
    ];

    let result = await api
      .post(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set({'api-key': helper.config.apiKey})
      .send(validQuestions);

    result.type.should.equal('application/json');
    result.statusCode.should.equal(200);
    result.body.count.should.equal(validQuestions.length);
  });
});
