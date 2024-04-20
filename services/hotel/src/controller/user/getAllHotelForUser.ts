import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

const getAllHotelForUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotel = await prisma.hotel.findMany({
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

export default getAllHotelForUser;