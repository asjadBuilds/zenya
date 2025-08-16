import {z} from 'zod';

export const schema = z.object({
    email:z.string().email("Invalid Email"),
    role:z.string().min(1,"role is required")
})

export type forgetPassSchema = z.infer<typeof schema>;