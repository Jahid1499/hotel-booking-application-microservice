import prisma from '@/prisma';
import { UserUpdateSchema } from '@/schemas';
import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const field = req.params.field as string;
        let user: User | null = null;

        if (field === 'authUserId') {
            user = await prisma.user.findUnique({ where: { authUserId: id } });
        } else {
            user = await prisma.user.findUnique({ where: { id: id } });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // parse body
        const parseData = await UserUpdateSchema.safeParse(req.body)

        if (!parseData.success) {
            return res.status(400).json({ errors: parseData.error.errors })
        }

        const updateUser = await prisma.user.update({
            where: { id: req.params.id },
            data: {
                ...parseData.data,
            },
        });

        return res.status(201).json({ message: "User successfully updated", updateUser })


    } catch (error) {
        next(error);
    }
}

export default updateUser;