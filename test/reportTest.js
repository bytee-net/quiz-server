const helper = require('./base');

const api = helper.api;
const path = helper.config.prefix + '/report';

const sampleReport = {
  email: 'test@bytee.net',
  comment: 'Question is wrong',
  question: '5cea428e63300c489d0bb241'
};

/**
 * Test suite for /report
 */
describe('POST /report', () => {
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
      .send(sampleReport);

    result.statusCode.should.equal(200);
    result.body.should.be.a('object');

    // We should get an id
    result.body._id.should.be.a('string');

    // Dates should be set
    result.body.created.should.be.a('string');
    result.body.updated.should.be.a('string');

    // Published should be false!
    result.body.email.should.equal(sampleReport.email);
    result.body.comment.should.equal(sampleReport.comment);
    result.body.question.should.equal(sampleReport.question);
  });

  it('Should require a comment', async () => {
    let report = JSON.parse(JSON.stringify(sampleReport));

    report.comment = '';

    const result = await api
      .post(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(report);

    result.statusCode.should.equal(405);
  });

  it('Should require a question', async () => {
    let report = JSON.parse(JSON.stringify(sampleReport));

    report.question = '';

    const result = await api
      .post(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(report);

    result.statusCode.should.equal(405);
  });
});
