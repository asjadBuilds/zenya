'use client'
import { useMutation } from "@tanstack/react-query"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { updateAppointmentFees } from "@/services/appointmentApi"
import { toast } from "sonner"
import { useState } from "react"


const UpdateAppointmentFees = () => {
    const [fees, setFees] = useState('')
    const {mutate} = useMutation({
        mutationFn:updateAppointmentFees,
        onSuccess:(response)=>{
            toast.success(response?.message);
        },
        onError:(error:any)=>{
            toast.error(error?.response?.data?.error)
        }
    })
    const handleUpdateFees = ()=>{
        if(!fees) return toast.error("Minimum fees is 500");
        mutate(fees);
    }
  return (
    <div className="flex flex-col gap-2 bg-card-primary rounded-xl shadow-md w-full p-2">
        <h1 className="font-sans font-semibold">Update Appointment Fees</h1>
        <div className="flex max-md:flex-col items-center gap-2">
            <Label className="font-mono">Enter Your New Fees:</Label>
            <div className="relative">
                <Input placeholder="1400" value={fees} onChange={(e)=>setFees(e.target.value)}/>
                <Badge variant={'outline'} className="absolute top-0 right-0 h-9">PKR</Badge>
            </div>
        </div>
        <Button className="w-1/4 max-md:w-full" onClick={handleUpdateFees}>Update Fees</Button>
    </div>
  )
}

export default UpdateAppointmentFees