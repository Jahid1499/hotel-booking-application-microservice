
import { userLogin, userRegistration, verifyEmail, verifyToken } from '@/controller';

import express from 'express';
const authRouter = express.Router();

authRouter.post('/registration', userRegistration)
authRouter.post('/login', userLogin)
authRouter.post('/verify-token', verifyToken)
authRouter.post('/verify-email', verifyEmail)

export default authRouter;