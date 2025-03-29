const { Resend } = require("resend");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

// Absolute path to the logo file (local path on your system)
const logoPath = path.join(
  __dirname,
  "frontend",
  "src",
  "components",
  "Images",
  "Logo.png"
);

/**
 * Send a maintenance reminder email
 * @param {string} to - The user's email
 * @param {string} subject - Email subject
 * @param {string} text - Plaintext version of the message
 * @param {string} html - HTML version of the message
 */
const sendMaintenanceEmail = async (to, subject, text, html) => {
  try {
    const data = await resend.emails.send({
      from: "MaintenanceNotification@carlogix.xyz",
      to,
      subject,
      text,
      html,
      attachments: [
        {
          filename: "logo.png",
          content: fs.readFileSync(logoPath).toString("base64"),
          type: "image/png",
          disposition: "inline",
          content_id: "logo",
        },
      ],
    });

    console.log("Resend maintenance email response:", data);
    return true;
  } catch (error) {
    console.error("Error sending maintenance email:");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    return false;
  }
};

module.exports = sendMaintenanceEmail;
