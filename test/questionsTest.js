const helper = require('./base');

// Supertest API Wrapper
const api = helper.api;
const path = helper.config.prefix + '/questions';

/**
 * Test suite for /questions
 */
describe('Get /questions', () => {
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
});
