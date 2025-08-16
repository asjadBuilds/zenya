import { CONFIG } from "@/config"
import { ReviewsResponse } from "@/models/reviewCols";
import apiClient from "@/utils/apiClient"

type addReviewProps = {
    doctorId:string;
    rating:Number;
    comment:string
}

const getDoctorReviews = async(doctorId:string)=>{
    const res = await apiClient.post(CONFIG.getDoctorReviews,{doctorId});
    return res.data;
}
const addReview = async({doctorId,rating,comment}:addReviewProps)=>{
    const res = await apiClient.post(CONFIG.addReview,{doctorId,rating,comment});
    return res.data;
}

const getReviewsByDoctor = async(params: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  [key: string]: any; // for extra filters
}): Promise<ReviewsResponse> => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });


  const res = await apiClient(`${CONFIG.getReviewsByDoctor}?${queryParams.toString()}`);
  return res.data

}

const deleteReview = async(reviewId:string)=>{
  const res = await apiClient.post(CONFIG.deleteReview,{reviewId});
  return res.data;
}


export {
    getDoctorReviews,
    addReview,
    getReviewsByDoctor,
    deleteReview
}