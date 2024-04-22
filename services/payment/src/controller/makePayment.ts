import { MakePaymentSchema } from '@/schemas';
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

const makePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // parse body
        const parseData = await MakePaymentSchema.safeParse(req.body)
        if (!parseData.success) {
            return res.status(400).json({ errors: parseData.error.errors })
        }

        const paymentIntentId = parseData.data.paymentIntentId;

        const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId as string
        );

        if (!paymentIntent) {
            return res.status(400).json({ message: "payment intent not found" });
        }

        if (paymentIntent.metadata.hotelId !== req.params.hotelId || paymentIntent.metadata.userId !== req.params.userId) {
            return res.status(400).json({ message: "payment intent mismatch" });
        }

        if (paymentIntent.status !== "succeeded") {
            return res.status(400).json({ message: `payment intent not succeeded. Status: ${paymentIntent.status}` });
        }

        // create payment
        const payment = await prisma.payment.create({
            data: {
                userId: req.params.userId,
                hotelId: req.params.hotelId,
                amount: paymentIntent.amount,
                currency: paymentIntent.currency,
            }
        })

        // TODO: send email to user
        // TODO: Hotel status update
        // TODO: Booking status update

        return res.status(201).json({ message: "Payment successfully done", payment })

    } catch (error) {
        next(error)
    }
}

export default makePayment;