import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "557d3b7b64b14e",
    pass: "f2dc99d1e54b2e",
  },
});

export async function sendEmail({to, subject, html}) {
    const info = await transporter.sendMail({
      from: `"Your App" <${process.env.MAILTRAP_USERNAME}>`,
      to,
      subject,
      html,
    });

    console.log("Message sent:", info.messageId);
}