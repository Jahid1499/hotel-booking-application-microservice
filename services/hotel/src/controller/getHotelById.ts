import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

const getHotelById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const hotel = await prisma.hotel.findUnique({
            where: {
                id: id
            },
            include: {
                images: true,
                facilities: true
            }
        });

        return res.status(200).json({ status: 'success', hotel });

    } catch (error) {
        next(error);
    }
};

export default getHotelById;