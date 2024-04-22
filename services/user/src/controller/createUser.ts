
import prisma from '@/prisma';
import { UserCreateSchema } from '@/schemas';
import { NextFunction, Request, Response } from 'express';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // parse body
        const parseData = await UserCreateSchema.safeParse(req.body)

        if (!parseData.success) {
            return res.status(400).json({ errors: parseData.error.errors })
        }

        // check user exists
        const userIsExists = await prisma.user.findUnique({
            where: { authUserId: parseData.data.authUserId }
        });

        if (userIsExists) {
            return res.status(409).send({ message: "User already exists" })
        }

        const user = await prisma.user.create({ data: parseData.data })

        return res.status(201).json({ message: "User successfully created", user })

    } catch (error) {
        next(error)
    }
}

export default createUser;