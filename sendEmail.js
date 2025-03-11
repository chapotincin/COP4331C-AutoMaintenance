const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (to, verificationCode) => {
    const msg = {
        to,
        from: process.env.SENDER_EMAIL, // Must be a verified sender
        subject: "Verify Your Email",
        text: `Your verification code is: ${verificationCode}`,
        html: `<strong>Your verification code is: ${verificationCode}</strong>`,
    };

    try {
        await sgMail.send(msg);
        console.log("Verification email sent!");
        return true;
    } catch (error) {
        console.error("Error sending email:", error.response ? error.response.body : error);
        return false;
    }
};

module.exports = sendVerificationEmail;
