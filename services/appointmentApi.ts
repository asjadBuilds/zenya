import { CONFIG } from "@/config"
import apiClient from "@/utils/apiClient"

const bookAppointment = async({doctorId, dateTime}:{doctorId:string, dateTime:string})=>{
    const res = await apiClient.post(CONFIG.bookAppointment,{doctorId,dateTime});
    return res.data;
}

const getTodayDocAppointments = async()=>{
    const res = await apiClient.get(CONFIG.getTodayDocAppointments);
    return res.data?.data
}

const updateAppointmentSlots = async(slots:any[])=>{
    const res = await apiClient.post(CONFIG.updateAppointmentSlots,{slots});
    return res.data;
}

const updateAppointmentFees = async(fees:string)=>{
    const res = await apiClient.post(CONFIG.updateAppointmentFees,{fees});
    return res.data;
}

const getDoctorAppointments = async(params: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  [key: string]: any; // for extra filters
}) => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });


  const res = await apiClient(`${CONFIG.getDoctorAppointments}?${queryParams.toString()}`);
  return res.data
}

export {
    bookAppointment,
    getTodayDocAppointments,
    updateAppointmentSlots,
    updateAppointmentFees,
    getDoctorAppointments
}