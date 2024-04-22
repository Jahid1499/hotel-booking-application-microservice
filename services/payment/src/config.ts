export const PORT = process.env.PORT || 4006;

import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_API_KEY as string);