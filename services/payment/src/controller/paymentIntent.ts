import { stripe } from '@/config';
import { PaymentIntentSchema } from '@/schemas';


import { NextFunction, Request, Response } from 'express';

const paymentIntent = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // parse body
        const parseData = await PaymentIntentSchema.safeParse(req.body)
        if (!parseData.success) {
            return res.status(400).json({ errors: parseData.error.errors })
        }

        const hotel = {
            pricePerNight: 200,
        };

        // TODO: get hotel details
        const totalCost = hotel.pricePerNight * parseData.data.numberOfNights;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalCost * 100,
            currency: "gbp",
            metadata: {
                hotelId: parseData.data.hotelId,
                userId: parseData.data.userId,
            },
        });

        if (!paymentIntent.client_secret) {
            return res.status(500).json({ message: "Error creating payment intent" });
        }

        const response = {
            paymentIntentId: paymentIntent.id,
            clientSecret: paymentIntent.client_secret.toString(),
            totalCost,
        };

        res.send(response);

    } catch (error) {
        next(error)
    }
}

export default paymentIntent;