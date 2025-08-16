import { CONFIG } from "@/config";
import apiClient from "@/utils/apiClient";

const fetchCategories = async()=> {
   const res = await apiClient.get(CONFIG.getCategories);
   return res.data;
}

export { 
    fetchCategories
};