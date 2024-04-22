import { z } from "zod";

export const ReviewCreateSchema = z.object({
    hotelId: z.string(),
    userId: z.string(),
    review: z.string(),
    starRating: z.number().min(1).max(5),
});

export const ReviewUpdateSchema = ReviewCreateSchema.omit({ hotelId: true, userId: true }).partial();
