'use client'
import { Button } from "@/components/ui/button"
import { confirmAppointment } from "@/services/paymentApi"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

const page = async({ params }: { params: Promise<{ slug: string[] }> }) => {
    const router = useRouter();
    const {slug} = await params;
    const [doctorId, doctorName, fee, appointmentId] =  slug;
    const decodeDocName = decodeURIComponent(doctorName)
    const {mutate} = useMutation({
        mutationFn:confirmAppointment,
        onSuccess:(response)=>{
            router.push(response?.data?.url)
        }
    })
  return (
    <div className="h-[calc(100vh-68px)] flex flex-col gap-3 items-center justify-center text-center">
        <h1 className="font-sans text-3xl font-bold">Confirm Your Appointment</h1>
        <p className="font-mono text-neutral-400">Confirm Your Payment to book consultation</p>
        <Button onClick={()=>mutate({doctorId, doctorName:decodeDocName, fee, appointmentId})}>Confirm Payment</Button>
    </div>
  )
}

export default page