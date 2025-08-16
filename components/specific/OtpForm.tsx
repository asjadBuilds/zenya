'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useState } from "react"
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "@/services/authApi";
import ResetPasswordForm from "./ResetPasswordForm";
import { toast } from "sonner";

interface OtpFormProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    email:string
}
const OtpForm = ({ open:openOTPModal, setOpen:setOTPModal, email }: OtpFormProps) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
     const [otp, setOtp] = useState("")
    const {mutate} = useMutation({
        mutationFn:verifyOtp,
        onSuccess:(response)=>{
            toast.success(response?.message);
            handleOpen()
        },
        onError:(error:any)=>{
            toast.error(error?.response?.data?.error)
        }
    })
    return (
        <>
        <Dialog open={openOTPModal} onOpenChange={setOTPModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>OTP Verification</DialogTitle>
                    <DialogDescription>
                        Enter Your OTP to Continue
                    </DialogDescription>
                </DialogHeader>
                <InputOTP maxLength={4} value={otp} onChange={(value) => setOtp(value)}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                    </InputOTPGroup>
                </InputOTP>
                <Button onClick={()=>mutate({email,otp})}>Verify OTP</Button>
            </DialogContent>
        </Dialog>
        <ResetPasswordForm open={open} setOpen={setOpen} email={email}/>
        </>
    )
}

export default OtpForm