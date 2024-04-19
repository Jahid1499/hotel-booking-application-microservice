import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

const getAllHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = (req.headers['x-user-id'] as string) || null;

        if (!userId) {
            return res.status(404).json({ message: 'User not found' });
        }

        // find hotel by id
        const hotel = await prisma.hotel.findMany({
            where: {
                userId
            },
            include: {
                images: true,
                facilities: true
            }
        })

        return res.status(200).json({ status: 'success', hotel });

    } catch (error) {
        next(error);
    }
};

export default getAllHotel;