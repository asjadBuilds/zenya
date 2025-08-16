'use client'
import { getDoctorProfile } from "@/services/doctorApi"
import moment from 'moment';
import { MoveRight, TicketCheck, TicketX } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { bookAppointment } from "@/services/appointmentApi";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";

type Props = {
  doctorId: string
}
const AppointmentListing = ({ doctorId }: Props) => {
  const router = useRouter()
  const { data: doctor } = useQuery({
    queryKey: ['fetchDoctorProfile', doctorId],
    queryFn: () => getDoctorProfile(doctorId),
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })
  const { mutate } = useMutation({
    mutationFn: bookAppointment,
    onSuccess: (response) => {
      toast.success('Appointment Added')
      router.push(`/confirmPayment/${doctorId}/${encodeURIComponent(doctor?.data?.fullname)}/${doctor?.data?.appointmentFees}/${response?.data?._id}`)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error)
    }
  })
  const handleAppBooking = (doctorId: string, dateTime: string) => {
    mutate({ doctorId, dateTime })
  }
  return (
    <div className="bg-card-primary rounded-xl flex flex-col gap-2 p-2">
      <h1 className="font-sans font-semibold">Appointments</h1>
      <div className="flex flex-col gap-3">
        {doctor?.data?.availableSlots?.length ? doctor?.data?.availableSlots.map((slot: any, index: number) => (
          <Accordion key={index} type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="accordion-item">
                <div className="flex items-center w-full justify-between p-4 rounded-xl bg-primary text-white">
                  <div className="hover:no-underline">{moment(slot.dateTime).format('MMMM Do YYYY, h:mm a')}</div>
                  {slot?.isBooked ? <TicketX className="text-white" /> : <TicketCheck className="text-white" />}
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex max-md:flex-col items-center justify-between gap-4 p-2">
                <p className="text-mono">Make Sure You have Google Meet for Smooth Online Consyltation</p>
                <Button asChild onClick={() => handleAppBooking(doctor?.data?._id, slot?.dateTime)} className={`${slot?.isBooked ? '!bg-gray-400':''}`}>
                  <div className={`flex items-center cursor-pointer `}>
                    <span>Book Appointment</span>
                    <MoveRight />
                  </div>
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )) : <div className="flex flex-col items-center justify-center gap-2">
          <Image src={'/assets/no-data.svg'} alt="no-data" width={100} height={100} />
          <h1 className="text-xl font-bold font-mono">No Appointments Yet</h1>
        </div>}
      </div>
    </div>
  )
}

export default AppointmentListing