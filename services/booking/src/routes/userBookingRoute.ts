
import { bookHotel, bookingDetails, getMyBookingList } from '@/controller';
import express from 'express';

const userHotelBooking = express.Router();

userHotelBooking.get('/admin/booked-room', bookHotel)
userHotelBooking.get('/admin/free-room', bookingDetails)
userHotelBooking.get('/admin/free-room', getMyBookingList)

export default userHotelBooking;