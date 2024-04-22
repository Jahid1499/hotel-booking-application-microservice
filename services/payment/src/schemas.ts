import { z } from 'zod';

export const PaymentIntentSchema = z.object({
    userId: z.string(),
    hotelId: z.string(),
    amount: z.number(),
    currency: z.string(),
    numberOfNights: z.number()
});

export const MakePaymentSchema = z.object({
    paymentIntentId: z.string()
});
