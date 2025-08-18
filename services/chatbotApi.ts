import { CONFIG } from "@/config"
import apiClient from "@/utils/apiClient"

const getChatbotInfo = async(query:string)=>{
    const res = await apiClient.post(CONFIG.getChatBotInfo,{query});
    return res.data
}

export {
    getChatbotInfo
}