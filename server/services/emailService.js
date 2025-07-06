import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

export async function sendEmail({to, subject, html}) {
    await transporter.sendMail({
      from: `"Your App" <${process.env.MAILTRAP_USERNAME}>`,
      to,
      subject,
      html,
    });

    console.log("Message sent:", info.messageId);
}