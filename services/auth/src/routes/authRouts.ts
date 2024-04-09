
import { userRegistration, verifyToken } from '@/controller';
import userLogin from '@/controller/userLogin';
import express from 'express';
const authRouter = express.Router();

authRouter.post('/registration', userRegistration)
authRouter.post('/login', userLogin)
authRouter.get('/verify-token', verifyToken)

export default authRouter;