import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

const getAllFreeRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const hotelId = req.params.id;

        const hotels = await prisma.booking.findMany({
            where: {
                hotelId
            }
        });

        res.status(200).json({ message: 'Success', hotels });

    } catch (error) {
        next(error);
    }
};

export default getAllFreeRoom;