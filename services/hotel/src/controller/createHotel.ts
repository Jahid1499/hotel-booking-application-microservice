import prisma from '@/prisma';
import { FacilitiesSchema, HotelCreateSchema } from '@/schemas';
import cloudinary from "cloudinary";
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const createHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // Validate request body
        const parsedBody = HotelCreateSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({
                message: 'Invalid request body',
                errors: parsedBody.error.errors,
            });
        }

        // Create hotel
        const hotel = await prisma.hotel.create({
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

        facilities.data.map(async (item) => {
            await prisma.facilities.create({
                data: {
                    hotel_id: hotel.id,
                    facilities: item.facilities,
                }
            })
        })

        const imageFiles = req.files as Express.Multer.File[];
        await uploadImages(imageFiles, hotel.id);

        return res.status(201).json({
            message: 'Hotel successfully created',
            hotel,
        });

    } catch (error) {
        next(error);
    }
};

const createImage = async (hotel_id: string, imageUrl: string) => {
    await prisma.image.create({
        data: {
            hotel_id: hotel_id,
            imageUrl: imageUrl
        }
    })
}

async function uploadImages(imageFiles: Express.Multer.File[], hotel_id) {
    imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        await createImage(hotel_id, res.url);
    });

    return true;
}

export default createHotel;