import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

const getMyBookingList = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req.params.id;

        const hotels = await prisma.booking.findMany({
            where: {
                userId
            }
        });

        res.status(200).json({ message: 'Success', hotels });
    } catch (error) {
        next(error);
    }
};

export default getMyBookingList;