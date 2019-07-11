const config = require('../config.js');
const mailgun = config.mailgun_api_key ? require('mailgun-js')({apiKey: config.mailgun_api_key, domain: config.mailgun_domain}) : '';

/**
 * Helper for Mailgun Mail sending
 */
const MailHelper = {

  notifyAdmin(subject, text) {
    let data = {
      from: config.mailgun_from,
      to: config.admin_email,
      subject: subject,
      text: text
    };

    if (!mailgun) {
      console.log('Mailgun support is disabled (No Mailgun API key)');
      console.log('Mail body: ' + JSON.stringify(data));

      return;
    }

    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    })
  },
};

module.exports = MailHelper;
