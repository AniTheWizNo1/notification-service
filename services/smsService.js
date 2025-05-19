require('dotenv').config();
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = {
  send: async (to, message) => {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: to
    });
    console.log(`SMS sent to ${to}: ${message}`);
  }
};