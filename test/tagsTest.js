const helper = require('./base');

// Supertest API Wrapper
const api = helper.api;
const path = helper.config.prefix + '/tags';

/**
 * Test suite for /tags
 */
describe('Tests for /tags', () => {
  it('Should return an array', async () => {
    let result = await api
      .get(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send();

    console.log(result.body);

    result.type.should.equal('application/json');
    result.statusCode.should.equal(200);
    result.body.should.be.a('array');
  });
});
