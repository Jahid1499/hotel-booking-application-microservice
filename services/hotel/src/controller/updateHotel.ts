import { NextFunction, Request, Response } from 'express';

const updateHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {


    } catch (error) {
        next(error);
    }
};

export default updateHotel;