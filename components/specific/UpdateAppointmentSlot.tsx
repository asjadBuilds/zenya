'use client'
import { useState } from 'react'
import Datepicker from './Datepicker'
import { Button } from '../ui/button';
import moment from 'moment';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { updateAppointmentSlots } from '@/services/appointmentApi';

const UpdateAppointmentSlot = () => {
    const [slots, setSlots] = useState<any>([]);
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [time, setTime] = useState<string | number | undefined>(undefined)
    const handleAddDate = () => {
        const datePart = new Date(date || Date.now());
        const [hours, minutes, seconds] = typeof time === 'string' ? time.split(":").map(Number) : [0, 0, 0]
        datePart.setHours(hours, minutes, seconds, 0);
        const isoString = datePart.toISOString();
        console.log(isoString)
        setSlots((prev:any)=>[...prev,isoString])
    }
    const {mutate} = useMutation({
        mutationFn:updateAppointmentSlots,
        onSuccess:(response)=>{
            toast.success(response?.message)
        },
        onError:(error:any)=>{
            toast.error(error?.response?.data?.error)
        }
    })
    const updateHandler = ()=>{
        if(slots.length<1) return toast.error("Minimum 1 Slot Entry is required to update");
        mutate(slots)
    }
    return (
        <div className="flex flex-col gap-2 bg-card-primary rounded-xl shadow-md p-2 w-full">
            <h1 className='font-sans font-semibold'>Appointment Settings</h1>
            <div className="flex flex-col gap-3">
                <h2 className='text-sm font-medium font-sans'>Add Appointment Slots</h2>
                <div className="flex max-md:flex-col items-center justify-between gap-4 w-full *:w-1/2 max-md:*:w-full">
                    <div className='flex flex-col gap-2'>
                        <Datepicker date={date} setDate={setDate} time={time} setTime={setTime} />
                        <Button className='w-1/2' onClick={() => handleAddDate()}>Add Date Time</Button>
                    </div>
                    <div className='flex flex-wrap items-center gap-2'>
                        <span className='text-xs font-mono'>Here are your entered Slots</span>
                        {slots.length ? slots.map((slot: any, index: number) => (
                            <Badge variant={'outline'}>{moment(slot).format('MMMM Do YYYY, h:mm:ss a')}</Badge>
                        )) : <span className='text-sm font-semibold font-mono'>No Slots Yet</span>}
                    </div>
                </div>
                <Button className='w-1/4 max-md:w-full self-end' onClick={()=>updateHandler()}>Update Appointment Slots</Button>
            </div>
        </div>
    )
}

export default UpdateAppointmentSlot