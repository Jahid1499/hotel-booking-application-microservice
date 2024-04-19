import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

const deleteHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = req.params.id;

        await prisma.hotel.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({ message: 'Hotel successfully deleted' });
    } catch (error) {
        next(error);
    }
};

export default deleteHotel;