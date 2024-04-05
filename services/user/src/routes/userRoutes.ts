import { createUser, getUserById, updateUser } from '@/controller';
import express from 'express';

const userRouter = express.Router();

userRouter.post('/users', createUser)
userRouter.get('/users/:id', getUserById)
userRouter.put('/users/:id', updateUser)

export default userRouter;