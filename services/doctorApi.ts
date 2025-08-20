import { CONFIG } from "@/config"
import { addEduForm } from "@/models/addEducationForm";
import { addExpForm } from "@/models/addExpForm";
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

const getDoctorEducation = async()=>{
    const res = await apiClient.get(CONFIG.getDoctorEducation);
    return res.data?.data;
}

const getDoctorExperience = async()=>{
    const res = await apiClient.get(CONFIG.getDoctorExperience);
    return res.data?.data;
}

const addEducation = async(formData:addEduForm)=>{
    const res = await apiClient.post(CONFIG.addEducation,formData);
    return res.data;
}

const editEducation = async({formData,educationId}:{formData:addEduForm,educationId:string})=>{
    const res = await apiClient.post(CONFIG.editEducation,{...formData,educationId});
    return res.data;
}

const deleteEducation = async(educationId:string)=>{
    const res = await apiClient.post(CONFIG.deleteEducation,{educationId});
    return res.data;
}

const addExperience = async(formData:addExpForm)=>{
    const res = await apiClient.post(CONFIG.addExperience,formData);
    return res.data;
}

const editExperience = async({formData,experienceId}:{formData:addExpForm,experienceId:string})=>{
    const res = await apiClient.post(CONFIG.editExperience,{...formData,experienceId});
    return res.data;
}

const deleteExperience = async(experienceId:string)=>{
    const res = await apiClient.post(CONFIG.deleteExperience,{experienceId});
    return res.data;
}

export {
    getDoctorsByCategory,
    getDoctorsByQuery,
    getDoctorProfile,
    getDoctorEducation,
    getDoctorExperience,
    addEducation,
    editEducation,
    deleteEducation,
    addExperience,
    editExperience,
    deleteExperience
}