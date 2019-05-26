/**
 * Helper for MongoDb
 * @type {{}}
 */

const config = require('../config.js');

const MongoHelper = {
  getUrl() {
    let url = 'mongodb://';

    if (config.mongodb_user) {
      url += `${encodeURIComponent(config.mongodb_user)}:${encodeURIComponent(config.mongodb_password)}@`;
    }

    url += `${config.mongodb_host}/${config.mongodb_db}`;

    // Only needed if we got credentials
    if (config.mongodb_user) {
      url += `${config.mongodb_auth_mechanism}`;
    }

    return url;
  }
};

module.exports = MongoHelper;
