import { CONFIG } from "@/config"
import apiClient from "@/utils/apiClient"

const getDoctorsByCategory = async(categoryId:string,country:string,city:string)=>{
    const res = await apiClient.post(CONFIG.getDoctorsByCategory,{categoryId,country,city});
    return res.data;
}

const getDoctorsByQuery = async(query:string)=>{
    const res = await apiClient.post(`${CONFIG.getDoctorsByQuery}?name=${query}`);
    return res.data
}

const getDoctorProfile = async(doctorId:string)=>{
    const res = await apiClient.post(CONFIG.getDoctorProfile,{doctorId});
    return res.data
}

export {
    getDoctorsByCategory,
    getDoctorsByQuery,
    getDoctorProfile
}