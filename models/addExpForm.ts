import z from "zod";

export const schema = z.object({
    instituteName: z.string().min(1,"Institute Name is required"),
    role: z.string().min(1,"Role is required"),
    stateDate: z.string().min(1,"Start Date is required"),
    endDate:z.string().min(1,"End Date is required")
})

export type addExpForm = z.infer<typeof schema>;