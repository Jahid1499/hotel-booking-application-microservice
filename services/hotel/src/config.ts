import multer from 'multer';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'host.docker.internal',
    port: parseInt(process.env.SMTP_PORT || '1025'),
});

export const defaultSender =
    process.env.DEFAULT_SENDER_EMAIL || 'admin@example.com';


const storage = multer.memoryStorage();
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});