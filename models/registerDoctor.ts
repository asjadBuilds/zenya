import { z } from "zod";

const schema = z.object({
    fullname: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters long"),
    phone: z.string().min(10, "Phone number must be at least 10 characters long"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    specialization: z.string().min(1, "Specialization is required"),
    categoryId: z.string().min(1, "Category ID is required"),
    avatar: z.instanceof(File,{error: "Avatar required"}),
    appointmentFees: z
    .string()
    .min(1, "minimum fees is 150")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Appointment fees must be a number",
    }),
})
    .refine((data) => data.password === data.confirmPassword, {
        error: "Passwords do not match",
        path: ["confirmPassword"],
    });

export default schema;

export type RegisterDoctorSchema = z.infer<typeof schema>;