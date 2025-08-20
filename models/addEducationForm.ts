import z from "zod";

export const schema = z.object({
    instituteName: z.string().min(1,"Institute Name is required"),
    degreeName: z.string().min(1,"Degree Name is required"),
    stateDate: z.string().min(1,"Start Date is required"),
    endDate:z.string().min(1,"End Date is required")
})

export type addEduForm = z.infer<typeof schema>;