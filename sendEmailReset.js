const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends a password reset email using Resend
 * @param {string} to - The recipient email
 * @param {string} resetLink - The reset password URL
 */
const sendResetEmail = async (to, resetLink) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Password Reset Request</h2>
      <p>You requested to reset your CarLogix password. Click the button below to reset it:</p>
      
      <p style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" target="_blank" rel="noopener noreferrer"
           style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Reset Password
        </a>
      </p>

      <p>If you didn’t request this, you can ignore this email.</p>
      <p style="margin-top: 40px;">– The CarLogix Team</p>
    </div>
  `;

  try {
    const response = await resend.emails.send({
      from: "PasswordReset@carlogix.xyz",
      to,
      subject: "Reset Your CarLogix Password",
      text: `Reset your password: ${resetLink}`,
      html: htmlContent,
    });

    console.log("Reset email response:", response);
    return true;
  } catch (err) {
    console.error("Error sending reset email:", err.message);
    return false;
  }
};

module.exports = sendResetEmail;
