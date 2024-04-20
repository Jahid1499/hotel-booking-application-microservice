
import { getAllHotelForUser, getHotelDetails, searchHotel } from '@/controller';
import express from 'express';

const userHotelRoutes = express.Router();

userHotelRoutes.get('/user/hotels', getAllHotelForUser)
userHotelRoutes.get('/user/hotels/:id', getHotelDetails)
userHotelRoutes.get('/user/hotels/search', searchHotel)

export default userHotelRoutes;