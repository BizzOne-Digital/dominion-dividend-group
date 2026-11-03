import 'server-only'
import nodemailer from 'nodemailer'
import { escapeHtml } from './sanitize'

export function isSmtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.CONTACT_RECEIVER_EMAIL)
}

/** Sends a new-inquiry notification. Silently skipped when SMTP is not configured. */
export async function sendInquiryNotification(inq: { name: string; email: string; category: string; message: string }) {
  if (!isSmtpConfigured()) return
  const port = Number(process.env.SMTP_PORT || 587)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    replyTo: inq.email,
    subject: `New website inquiry: ${inq.category}`,
    text: `Name: ${inq.name}\nEmail: ${inq.email}\nCategory: ${inq.category}\n\n${inq.message}`,
    html: `<p><strong>Name:</strong> ${escapeHtml(inq.name)}<br/><strong>Email:</strong> ${escapeHtml(inq.email)}<br/><strong>Category:</strong> ${escapeHtml(inq.category)}</p><p style="white-space:pre-wrap">${escapeHtml(inq.message)}</p>`,
  })
}
