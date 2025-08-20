'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { addEduForm, schema } from "@/models/addEducationForm"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { editEducation } from "@/services/doctorApi"
type editEduProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    educationId:string
}
const EditEducation = ({ open, setOpen, educationId }: editEduProps) => {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm<addEduForm>({
        resolver: zodResolver(schema),
        defaultValues: {
            stateDate: new Date().toISOString(),
            endDate: new Date().toISOString()
        }
    })
    const onDateChange = (key: string, date: string,) => {
        if (key === 'start') {
            const startDate = new Date(date);
            const isoDate = startDate.toISOString()
            setValue('stateDate', isoDate)
        } else {
            const endDate = new Date(date);
            const isoDate = endDate.toISOString();
            setValue('endDate', isoDate)
        }
    }
    const {mutate} = useMutation({
        mutationFn:editEducation,
        onSuccess:(response)=>{
            toast.success(response?.message);
            setOpen(false);
            queryClient.invalidateQueries({
                queryKey:['fetchDoctorEducation']
            })
        },
        onError:(error:any)=>{
            toast.error(error?.response?.data?.error)
        }
    })
    const submitHandler = (data: addEduForm) => {
        mutate({formData:data,educationId})
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Education</DialogTitle>
                    <DialogDescription>
                        Fill Your details Carefully
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Label className="text-nowrap">Institute Name:</Label>
                        <Input placeholder="xyz university" {...register('instituteName')} />
                        {errors.instituteName && <p className='text-red-500 text-sm'>{errors.instituteName.message}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                        <Label className="text-nowrap">Degree Name:</Label>
                        <Input placeholder="xyz degree" {...register('degreeName')} />
                        {errors.degreeName && <p className='text-red-500 text-sm'>{errors.degreeName.message}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                        <Label className="text-nowrap">Start Date:</Label>
                        <Input type="date" value={getValues().stateDate} onChange={(e) => onDateChange('start', e.target.value)} />
                        {errors.stateDate && <p className='text-red-500 text-sm'>{errors.stateDate.message}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                        <Label className="text-nowrap">End Date:</Label>
                        <Input type="date" value={getValues().endDate} onChange={(e) => onDateChange('end', e.target.value)} />
                        {errors.endDate && <p className='text-red-500 text-sm'>{errors.endDate.message}</p>}
                    </div>
                    <Button>Edit Education</Button>
                </form>
            </DialogContent>
        </Dialog>
  )
}

export default EditEducation