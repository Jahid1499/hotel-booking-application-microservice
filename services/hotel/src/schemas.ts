import { Type } from '@prisma/client';
import { z } from 'zod';


export const HotelCreateSchema = z.object({
    userId: z.string(),
    name: z.string(),
    address: z.string(),
    city: z.string(),
    country: z.string(),
    description: z.string(),
    adult_count: z.number().min(1),
    child_count: z.number().min(0).default(0),
    price_per_night: z.number(),
    start_rating: z.number().min(1).max(5),
    type: z.nativeEnum(Type)
});

export const HotelUpdateSchema = HotelCreateSchema.omit({ userId: true }).partial();