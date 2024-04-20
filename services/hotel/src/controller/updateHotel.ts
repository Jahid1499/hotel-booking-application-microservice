import prisma from '@/prisma';
import { FacilitiesSchema, HotelUpdateSchema } from '@/schemas';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const updateHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // Find hotel
        const id = req.params.id;
        const hotelData = await prisma.hotel.findUnique({
            where: {
                id: id
            }
        });

        if (!hotelData) {
            return res.status(404).json({ message: 'Invalid hotel' });
        }

        const parsedBody = HotelUpdateSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({
                message: 'Invalid request body',
                errors: parsedBody.error.errors,
            });
        }

        // Update hotel
        const hotel = await prisma.hotel.update({
            where: { id: id },
            data: {
                ...parsedBody.data,
            },
            include: {
                images: true
            }
        });

        const facilities = z.array(FacilitiesSchema).safeParse(req.body.facilities)
        if (!facilities.success) {
            return res.status(400).json({ errors: facilities.error.errors });
        }

        if (facilities.data.length === 0) {
            return res.status(400).json({ message: 'Facilities is empty' });
        }

        prisma.facilities.deleteMany({
            where: {
                hotel_id: id
            }
        })

        facilities.data.map(async (item) => {
            await prisma.facilities.create({
                data: {
                    hotel_id: hotel.id,
                    facilities: item.facilities,
                }
            })
        })

        // TODO: Image update

        return res.status(201).json({ message: 'Hotel successfully updated', hotel });

    } catch (error) {
        next(error);
    }
};

export default updateHotel;