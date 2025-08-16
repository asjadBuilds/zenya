import { z } from "zod";

const schema = z.object({
    username: z.string().min(1, "username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters long"),
    avatar: z.instanceof(File,{error: "Avatar required"})
})
.refine((data) => data.password === data.confirmPassword, {
        error: "Passwords do not match",
        path: ["confirmPassword"],
    });

export default schema;
export type RegisterUserSchema = z.infer<typeof schema>;