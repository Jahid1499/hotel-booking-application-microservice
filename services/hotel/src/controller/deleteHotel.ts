import { NextFunction, Request, Response } from 'express';

const deleteHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {


    } catch (error) {
        next(error);
    }
};

export default deleteHotel;