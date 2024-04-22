import prisma from '@/prisma';
import { HotelBookingSchema } from '@/schemas';
import { NextFunction, Request, Response } from 'express';

const bookHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // Validate request body
        const parsedBody = HotelBookingSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({
                message: 'Invalid request body',
                errors: parsedBody.error.errors,
            });
        }

        // TODO:Find user
        // TODO:Find hotel
        // TODO: Calculate room price
        // TODO: Total price calculation
        // TODO: Remove room type

        const roomPrice = 300;
        const totalPrice = 400;

        // Create booking
        const hotel = await prisma.booking.create({
            data: {
                ...parsedBody.data,
                roomPrice,
                totalPrice,
                roomType: ""
            }
        });

        // TODO: payment initiate

        res.status(200).json({ message: 'Hotel successfully booked' });
    } catch (error) {
        next(error);
    }
};

export default bookHotel;