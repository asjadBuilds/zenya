import { z } from "zod";

export const schema = z.object({
    email:z.string().email("Invalid Email Address"),
    password: z.string().min(8,"Password must be at least 8 characters long")
})

export type loginUserSchema = z.infer<typeof schema>;