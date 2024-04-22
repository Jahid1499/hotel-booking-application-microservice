import { z } from "zod";


export const HotelBookingSchema = z.object({
    hotelId: z.string(),
    userId: z.string(),
    startDate: z.string().date(),
    endDate: z.string().date(),
    childCount: z.number().min(0),
    adultCount: z.number().min(1),
});

