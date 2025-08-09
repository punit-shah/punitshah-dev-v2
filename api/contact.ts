import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

type RequestBody = {
  name: string;
  email: string;
  message: string;
};

export default async function contactHandler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const { name, email, message } = request.body as RequestBody;

  try {
    const info = await transporter.sendMail({
      from: `${name} <${process.env.GMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Message from punitshah.dev`,
      text: message,
      replyTo: email,
    });

    console.log('Email sent:', info);

    return response.status(200).json({ messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    return response.status(500).json({ error: 'Failed to send email' });
  }
}
