const twilio = require('twilio');
const keys = require("./config/keys");

const accountSid = keys.accountSid;
const authToken =  keys.authToken;

module.exports = new twilio(accountSid, authToken);