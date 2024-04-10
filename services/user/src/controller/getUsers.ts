import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {

        const users = await prisma.user.findMany({});

        return res.status(200).json(users);

    } catch (error) {
        next(error)
    }
}

export default getUsers;