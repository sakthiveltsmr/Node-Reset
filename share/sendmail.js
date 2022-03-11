const nodemailer = require("nodemailer");

//transport marginLeft:

const sendMail = async (email, text, subject) => {
  var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_USERNAME,
      pass: process.env.MAILER_PASSWORD,
    },
  });

  var mailOptions = {
    from: "sakthiveltest1234@gmail.com",
    to: email,
    subject: subject,
    text: text,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("err in sending mail", error);
    } else {
      console.log("email sent:" + info.response);
    }
  });
};

module.exports = sendMail;
