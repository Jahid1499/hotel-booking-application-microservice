import { z } from 'zod';

export const PaymentCreateSchema = z.object({
    userId: z.string(),
    hotelId: z.string(),
    amount: z.number(),
    currency: z.string(),
});
