
import { getEmails, sendEmail } from '@/controller';

import express from 'express';
const emailRouter = express.Router();

emailRouter.post('/emails/send', sendEmail)
emailRouter.get('/emails', getEmails)

export default emailRouter;