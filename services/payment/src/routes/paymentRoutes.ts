import { getHotelAdminPaymentDetails, getInvoice, makePayment, paymentIntent } from '@/controller';
import express from 'express';

const payment = express.Router();

payment.get('/payments/invoice/:id', getInvoice)
payment.post('/payments', makePayment)
payment.post('/payments/intent', paymentIntent)
payment.get('/payments/hotel-admin-payment-details/:hotelId', getHotelAdminPaymentDetails)

export default payment;