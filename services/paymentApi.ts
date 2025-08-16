import { CONFIG } from "@/config"
import apiClient from "@/utils/apiClient"

type confirmAppointmentProps = {
    doctorId:string,
    doctorName:string,
    fee:string,
    appointmentId:string
}
const confirmAppointment = async({doctorId, doctorName, fee, appointmentId}:confirmAppointmentProps)=>{
    const res = await apiClient.post(CONFIG.createCheckoutSession,{doctorId, doctorName, fee, appointmentId});
    return res.data;
}

export {
    confirmAppointment
}