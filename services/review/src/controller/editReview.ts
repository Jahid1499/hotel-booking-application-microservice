import prisma from '@/prisma';
import { ReviewUpdateSchema } from '@/schemas';
import { NextFunction, Request, Response } from 'express';

const editReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // parse body
        const parseData = await ReviewUpdateSchema.safeParse(req.body)
        if (!parseData.success) {
            return res.status(400).json({ errors: parseData.error.errors })
        }

        // Get review id
        const reviewId = req.params.id;

        // Find exists review
        const reviewExists = await prisma.review.findUnique({ where: { id: reviewId } })
        if (!reviewExists) {
            return res.status(404).json({ message: "Review not found" })
        }

        // Get user id from header x-user-id
        const userId = req.headers["x-user-id"] as string

        // Check if user is the owner of the review
        if (reviewExists.userId !== userId) {
            return res.status(403).json({ message: "You are not the owner of this review" })
        }

        // Update review
        const review = await prisma.review.update({
            where: { id: reviewId },
            data: {
                ...parseData.data,
                updatedAt: new Date()
            }
        })

        // Return response
        return res.status(201).json({ message: "Review successfully updated", review })

    } catch (error) {
        next(error)
    }
}

export default editReview;