const helper = require('./base');

const api = helper.api;
const path = helper.config.prefix;

/**
 * Test suite for /stats
 */
describe('Auth tests', () => {
  it('Should return 403 with wrong key', async () => {
    const result = await api
      .get(path + '/questions')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set({'api-key': 'notexisting'})
      .send();

    result.type.should.equal('application/json');
    result.statusCode.should.equal(403);
  });

  it('Works with correct key', async () => {
    const result = await api
      .get(path + '/questions')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set({'api-key': helper.config.apiKey})
      .send();

    result.type.should.equal('application/json');
    result.statusCode.should.equal(200);
  });

  it('Does not auth without key', async () => {
    const result = await api
      .get(path + '/questions')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send();

    result.type.should.equal('application/json');
    result.statusCode.should.equal(200);
  });
});
