// export const BASE_URL = 'http://localhost:5000';
export const BASE_URL = 'https://zenya-backend.onrender.com';

export const CONFIG = {
    getCategories: `${BASE_URL}/api/doctor/getCategories`,
    registerDoctor: `${BASE_URL}/api/auth/registerDoctor`,
    registerUser: `${BASE_URL}/api/auth/registerUser`,
    registerSocialUser: `${BASE_URL}/api/auth/registerSocialUser`,
    login: `${BASE_URL}/api/auth/login`,
    refreshAccesToken: `${BASE_URL}/api/auth/refreshAccessToken`,
    forgetPassword: `${BASE_URL}/api/auth/forgetPassword`,
    verifyOtp: `${BASE_URL}/api/auth/verifyOtp`,
    resetPassword: `${BASE_URL}/api/auth/resetPassword`,
    saveRefreshToken:`${BASE_URL}/api/auth/saveRefreshToken`,
    getDoctorsByCategory: `${BASE_URL}/api/doctor/getDoctorsByCategory`,
    getDoctorsByQuery: `${BASE_URL}/api/doctor/getDoctorsByQuery`,
    getDoctorProfile: `${BASE_URL}/api/doctor/getDoctorProfile`,
    getDoctorReviews: `${BASE_URL}/api/review/getDoctorReviews`,
    addReview: `${BASE_URL}/api/review/addReview`,
    bookAppointment:`${BASE_URL}/api/appointment/bookAppointment`,
    createCheckoutSession: `${BASE_URL}/api/payment/createCheckoutSession`,
    getTodayDocAppointments: `${BASE_URL}/api/appointment/getTodayDocAppointments`,
    updateAppointmentSlots: `${BASE_URL}/api/appointment/updateAppointmentSlots`,
    updateAppointmentFees: `${BASE_URL}/api/appointment/updateAppointmentFees`,
    getReviewsByDoctor: `${BASE_URL}/api/review/getReviewsByDoctor`,
    deleteReview: `${BASE_URL}/api/review/deleteReview`,
    getDoctorAppointments: `${BASE_URL}/api/appointment/getDoctorAppointments`,
    getChatBotInfo: `${BASE_URL}/api/chatbot/new`,
    changePassword: `${BASE_URL}/api/auth/changePassword`
}