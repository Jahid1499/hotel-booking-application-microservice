import { NextFunction, Request, Response } from 'express';

const getHotelById = async (req: Request, res: Response, next: NextFunction) => {
    try {


    } catch (error) {
        next(error);
    }
};

export default getHotelById;