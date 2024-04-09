import { USER_SERVICE } from '@/config';
import prisma from '@/prisma';
import { UserCreateSchema } from '@/schemas';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';

const generateVerificationCode = () => {
    // Get current timestamp in milliseconds
    const timestamp = new Date().getTime().toString();

    // Generate a random 2-digit number
    const randomNum = Math.floor(10 + Math.random() * 90); // Ensures 2-digit random number

    // Combine timestamp and random number and extract last 5 digits
    let code = (timestamp + randomNum).slice(-5);

    return code; //
};

const userRegistration = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Validate the request body
        const parsedBody = UserCreateSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        // check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: parsedBody.data.email },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(parsedBody.data.password, salt);

        // create the auth user
        const user = await prisma.user.create({
            data: {
                ...parsedBody.data,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                status: true,
                verified: true,
            },
        });
        console.log('User created: ', user);

        // create the user profile by calling the user service
        await axios.post(`${USER_SERVICE}/users`, {
            authUserId: user.id,
            name: user.name,
            email: user.email,
        });

        return res.status(201).json({
            message: 'User created. Check your email for verification code',
            user,
        });

    } catch (error) {
        next(error);
    }
};

export default userRegistration;