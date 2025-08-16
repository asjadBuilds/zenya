'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { resetPassSchema, schema } from "@/models/resetPasswordForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/services/authApi";
import { toast } from "sonner";

interface ResetProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    email: string
}
const ResetPasswordForm = ({ open, setOpen, email }: ResetProps) => {
    const {
        register,
        getValues,
        formState: { errors }
    } = useForm<resetPassSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            password: ''
        },
    })
    const { mutate } = useMutation({
        mutationFn: resetPassword,
        onSuccess: (response) => {
            toast.success(response?.message);
            window.location.reload()
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.error)
        }
    })
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reset Your Password</DialogTitle>
                    <DialogDescription>
                        Enter Your New Password
                    </DialogDescription>
                </DialogHeader>
                <Input placeholder="new password" type="password" {...register('password')} />
                {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                <Button onClick={() => mutate({ email, password: getValues().password })}>Verify OTP</Button>
            </DialogContent>
        </Dialog>
    )
}

export default ResetPasswordForm