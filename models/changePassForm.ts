import z from "zod";

export const schema = z.object({
    oldPassword:z.string().optional(),
    newPassword:z.string().min(8,"Password should be 8 characters long")
})

export type changePassSchema = z.infer<typeof schema>;