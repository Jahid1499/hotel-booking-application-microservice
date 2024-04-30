
import { bookHotel, bookingDetails, getMyBookingList } from '@/controller';
import express from 'express';

const userHotelBooking = express.Router();

userHotelBooking.post('/user/booked-hotel', bookHotel)
userHotelBooking.get('/user/booking-details/:id', bookingDetails)
userHotelBooking.get('/user/my-booking', getMyBookingList)

export default userHotelBooking;