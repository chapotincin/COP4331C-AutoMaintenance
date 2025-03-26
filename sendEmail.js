const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (to, verificationCode) => {
    try {
        const data = await resend.emails.send({
            from: process.env.FROM_EMAIL,
            to,
            subject: "Verify Your Email",
            text: `Your verification code is: ${verificationCode}`,
            html: `<strong>Your verification code is: ${verificationCode}</strong>`,
        });

        console.log("Resend response:", data);
        return true;

    } catch (error) {
        console.error("Error sending email via Resend:");
        console.error("Message:", error.message);
        console.error("Stack:", error.stack);
        console.error("Full Error:", error);
        return false;
    }
};

module.exports = sendVerificationEmail;


