import {z} from 'zod';

export const schema = z.object({
    password:z.string().min(8,"Password should be 8 characters long")
})

export type resetPassSchema = z.infer<typeof schema>;