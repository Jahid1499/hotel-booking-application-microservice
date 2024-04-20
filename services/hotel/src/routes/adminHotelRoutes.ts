import { upload } from '@/config';
import { createHotel, deleteHotel, getAllHotel, getHotelById, updateHotel } from '@/controller';
import express from 'express';

const adminHotelRoutes = express.Router();

adminHotelRoutes.get('/hotels', getAllHotel)
adminHotelRoutes.post('/hotels', upload.array("imageFiles", 6), createHotel)
adminHotelRoutes.get('/hotels/:id', getHotelById)
adminHotelRoutes.put('/hotels/:id', upload.array("imageFiles", 6), updateHotel)
adminHotelRoutes.delete('/hotels/:id', deleteHotel)

export default adminHotelRoutes;