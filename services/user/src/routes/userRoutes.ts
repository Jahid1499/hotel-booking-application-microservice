import { createUser, getUserById, getUsers, updateUser } from '@/controller';
import express from 'express';

const userRouter = express.Router();

userRouter.get('/users', getUsers)
userRouter.post('/users', createUser)
userRouter.get('/users/:id', getUserById)
userRouter.put('/users/:id', updateUser)

export default userRouter;