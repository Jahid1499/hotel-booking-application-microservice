import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

const getInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { id } = req.params;
        const payment = await prisma.payment.findUnique({ where: { id } });

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" })
        }

        return res.status(201).json({ message: "Success", payment })

    } catch (error) {
        next(error)
    }
}

export default getInvoice;