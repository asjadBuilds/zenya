'use client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
import { Form, useForm } from "react-hook-form"
import { forgetPassSchema, schema } from "@/models/forgetPassForm"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { forgetPassword } from "@/services/authApi"
import { useState } from "react"
import OtpForm from "./OtpForm"
import { toast } from "sonner"
const ForgetPassForm = () => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
      } = useForm<forgetPassSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
          email: '',
          role: '',
        },
      })
      const {mutate} = useMutation({
        mutationFn:forgetPassword,
        onSuccess:(response)=>{
            toast.success(response?.data?.message);
            handleOpen()
        },
        onError:(error:any)=>{
            toast.error(error?.response?.data?.error)
        }
      })
      const submitHandler = (values:forgetPassSchema)=>{
        mutate(values)
      }
    return (
        <>
        <Dialog>
            <DialogTrigger asChild>
                <span className='text-sm font-semibold underline hover:text-primary cursor-pointer'>Forget Password?</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Forget Password</DialogTitle>
                    <DialogDescription>
                        Enter Your Email and get an OTP to reset your password
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                        <Label>Email:</Label>
                        <Input placeholder='johndoe@gmail.com' type='email' {...register('email')}/>
                        {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                    </div>
                    <Select onValueChange={(value)=>setValue('role',value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="USER">User</SelectItem>
                            <SelectItem value="DOCTOR">Doctor</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button type="submit">Get OTP</Button>
                </form>
            </DialogContent>
        </Dialog>
        <OtpForm open={open} setOpen={setOpen} email={getValues().email}/>
        </>
    )
}

export default ForgetPassForm