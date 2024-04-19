import { createHotel, deleteHotel, getAllHotel, getHotelById, updateHotel } from '@/controller';
import express from 'express';

const adminHotelRoutes = express.Router();

adminHotelRoutes.get('/hotels', getAllHotel)
adminHotelRoutes.post('/hotels', createHotel)
adminHotelRoutes.get('/hotels/:id', getHotelById)
adminHotelRoutes.put('/hotels/:id', updateHotel)
adminHotelRoutes.delete('/hotels/:id', deleteHotel)

export default adminHotelRoutes;