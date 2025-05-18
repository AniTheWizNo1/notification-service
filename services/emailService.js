const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aniket10das@gmail.com',
    pass: 'urluuxjezwunnhqf', // Use Gmail App Password
  },
});

async function send(to, message) {
  const mailOptions = {
    from: 'aniket10das@gmail.com',
    to,
    subject: 'Notification',
    text: message,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Email sent to ${to}`);
}

module.exports = { send };
