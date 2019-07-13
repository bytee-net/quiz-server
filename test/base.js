const config = require('./config');
const assertArrays = require('chai-arrays');
const chai = require('chai');

chai.use(assertArrays);
const should = require('chai').should();
const supertest = require('supertest');

/**
 * Base class for testing
 * @type {{should, api: (Test|obj), config: ({server, api_key}|*)}}
 */
module.exports = {
    api: supertest(config.server),
    should: should,
    config: config,
};
