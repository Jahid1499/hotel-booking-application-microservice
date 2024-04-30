
import { getAllBookedRoom, getAllFreeRoom } from '@/controller';
import express from 'express';

const adminHotelBooking = express.Router();

adminHotelBooking.get('/admin/booked-room', getAllBookedRoom)
adminHotelBooking.get('/admin/free-room', getAllFreeRoom)

export default adminHotelBooking;
