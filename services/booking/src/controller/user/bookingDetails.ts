import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

const bookingDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = req.params.id;

        const hotels = await prisma.booking.findUnique({
            where: {
                id: id
            }
        });

        res.status(200).json({ message: 'Success', hotels });
    } catch (error) {
        next(error);
    }
};

export default bookingDetails;