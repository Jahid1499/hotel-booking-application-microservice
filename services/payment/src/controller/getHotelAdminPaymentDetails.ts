import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

const getHotelAdminPaymentDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { hotelId } = req.params;
        const payment = await prisma.payment.findMany({ where: { hotelId } });

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" })
        }

        return res.status(201).json({ message: "Success", payment })

    } catch (error) {
        next(error)
    }
}

export default getHotelAdminPaymentDetails;