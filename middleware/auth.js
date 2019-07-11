const config = require('../config.js');

/**
 * Simple API Key based auth for admin purposes.
 *
 * @param req {object} The request
 * @param res {object} The response
 * @param next {function} Trigger
 */
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['api-key'];

  // Check key
  if (apiKey && apiKey !== config.admin_api_key) {
    return res.status(403).json('Wrong API Key');
  }

  req.authenticated = apiKey !== undefined;

  next();
};

module.exports = apiKeyAuth;
