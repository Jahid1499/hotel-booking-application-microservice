import { z } from 'zod';

export const UserCreateSchema = z.object({
    authUserId: z.string(),
    name: z.string().min(3).max(20).trim(),
    email: z.string().email(),
    address: z.string().max(30).optional(),
    phone: z.string().max(11).optional(),
});

export const UserUpdateSchema = UserCreateSchema.omit({ authUserId: true }).partial();
