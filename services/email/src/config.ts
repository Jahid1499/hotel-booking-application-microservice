// export const USER_SERVICE = process.env.USER_SERVICE_URL || "http://localhost:4001"; 
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'host.docker.internal',
    port: parseInt(process.env.SMTP_PORT || '1025'),
});

export const defaultSender =
    process.env.DEFAULT_SENDER_EMAIL || 'admin@example.com';