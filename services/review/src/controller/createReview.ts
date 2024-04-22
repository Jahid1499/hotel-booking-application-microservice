import prisma from '@/prisma';
import { ReviewCreateSchema } from '@/schemas';
import { NextFunction, Request, Response } from 'express';

const createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // parse body
        const parseData = await ReviewCreateSchema.safeParse(req.body)
        if (!parseData.success) {
            return res.status(400).json({ errors: parseData.error.errors })
        }

        // Check if hotelId and userId exists in review table
        const reviewExists = await prisma.review.findFirst({
            where: {
                AND: [
                    { hotelId: parseData.data.hotelId },
                    { userId: parseData.data.userId }
                ]
            }
        });
        if (reviewExists) {
            return res.status(404).json({ message: "Already created review" })
        }

        // create review
        const review = await prisma.review.create({ data: parseData.data })

        return res.status(201).json({ message: "Review successfully created", review })


    } catch (error) {
        next(error)
    }
}

export default createReview;