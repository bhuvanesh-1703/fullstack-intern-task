const nodemailer = require("nodemailer");

require("dotenv").config();


// TRANSPORTER

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {

    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS,

  },

});


// SEND WELCOME EMAIL

const sendWelcomeEmail = async (
  email,
  username
) => {

  try {

    const mailOptions = {

      from: process.env.EMAIL_USER,

      to: email,

      subject: "Welcome to Template Store",

      html: `

        <div style="
          font-family:sans-serif;
          max-width:600px;
          margin:auto;
          padding:30px;
          border:1px solid #ddd;
          border-radius:10px;
        ">

          <h1 style="
            color:black;
            text-align:center;
          ">
            Welcome to Template Store 🚀
          </h1>

          <p>Hello ${username},</p>

          <p>
            Your account has been created successfully.
          </p>

          <p>
            You can now explore templates and save your favorites.
          </p>

          

          <p style="
            margin-top:40px;
            color:gray;
            font-size:14px;
          ">
            Thank you for joining us 
          </p>

        </div>

      `,

    };

    await transporter.sendMail(mailOptions);

    console.log("Welcome email sent");

  } catch (error) {

    console.log(
      "Email Error:",
      error.message
    );

  }

};

module.exports = {
  sendWelcomeEmail,
};