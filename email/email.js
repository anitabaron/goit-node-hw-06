const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const { MAIL_USER, MAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    // type: "OAuth2",
    type: "login",
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

const emailSender = async (to, subject, html) => {
  await transporter.sendMail({
    from: '"Mojo company" <mojo.company@gmail.com>',
    to,
    subject,
    html,
  });
  console.log("Message sent");
};

// emailSender("anitka.ba@gmail.com", "hello world", "hello test");

module.exports = { emailSender };
