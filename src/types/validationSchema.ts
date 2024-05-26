import { z } from 'zod';

export const userSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Name is required'),
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email format'),
    address: z.object({
        street: z.string().optional(),
        city: z.string().optional(),
        zipcode: z.string().optional(),
        geo: z.object({
            lat: z.number().nullable().optional(),
            lng: z.number().nullable().optional(),
        }).optional(),
    }).optional(),
    phone: z.string().regex(/^\d{10}$/, 'Invalid phone number format'),
});

export type User = z.infer<typeof userSchema>;