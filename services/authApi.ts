import { CONFIG } from "@/config";
import { forgetPassSchema } from "@/models/forgetPassForm";
import apiClient from "@/utils/apiClient";

const registerDoctor = async (formData: FormData) => {
    const res = await apiClient.post(CONFIG.registerDoctor, formData);
    return res.data;
}

const registerUser = async (formData: FormData) => {
    const res = await apiClient.post(CONFIG.registerUser, formData);
    return res.data;
}

const registerSocialUser = async (email: string, password: string, avatar: string) => {
    const res = await apiClient.post(CONFIG.registerSocialUser, { email, password, avatar });
    return res.data
}

const login = async ({ email, password }: { email: string, password: string }) => {
    const res = await apiClient.post(CONFIG.login, { email, password });
    return res
}

const forgetPassword = async (data: forgetPassSchema) => {
    const res = await apiClient.post(CONFIG.forgetPassword, data);
    return res;
}

const verifyOtp = async ({ email, otp }: { email: string, otp: string }) => {
    const res = await apiClient.post(CONFIG.verifyOtp, { email, otp });
    return res.data;
}

const resetPassword = async ({ email, password }: { email: string, password: string }) => {
    const res = await apiClient.post(CONFIG.resetPassword, { email, password });
    return res.data;
}

const saveRefreshToken = async ({ token, doctorId }: { token: string, doctorId: string }) => {
    const res = await apiClient.post(CONFIG.saveRefreshToken, { token, doctorId });
    return res.data
}

export {
    registerDoctor,
    registerUser,
    registerSocialUser,
    login,
    forgetPassword,
    verifyOtp,
    resetPassword,
    saveRefreshToken
}