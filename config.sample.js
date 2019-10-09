/**
 * Rename to config.js and adjust it
 */
const config = {
  mongodb_host: 'localhost',
  mongodb_user: '',
  mongodb_password: '',
  mongodb_auth_mechanism: 'DEFAULT',
  mongodb_db: 'quiz',

  // Key for administration
  admin_api_key: 'secure',
  admin_email: 'quiz@bytee.net',

  // Mail sending with mailgun.com
  mailgun_api_key: '',
  mailgun_domain: '',
  mailgun_from: 'Bytee <quiz@bytee.net>',
};

module.exports = config;
