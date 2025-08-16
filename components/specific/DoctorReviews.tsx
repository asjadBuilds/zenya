'use client'
import { addReview, getDoctorReviews } from "@/services/reviewApi"
import moment from 'moment';
import StarRating from "./StarRating";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
type Props = {
    doctorId: string
}
const DoctorReviews = ({ doctorId }: Props) => {
    const [reviewMsg, setReviewMsg] = useState<string>('');
    const [rating, setRating] = useState<number[]>([]);
    const queryClient = useQueryClient();
    const { data: reviews } = useQuery({
        queryKey: ['fetchReviews', doctorId],
        queryFn: () => getDoctorReviews(doctorId),
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })
    const { mutate } = useMutation({
        mutationFn: addReview,
        onSuccess: (response) => {
            setReviewMsg('');
            setRating([])
            toast.success(response.message);
            queryClient.invalidateQueries({
                queryKey: ['fetchReviews', doctorId],
            });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.error);
        }
    })
    const handleAddReview = () => {
        mutate({ doctorId, rating: rating.length, comment: reviewMsg })
    }
    return (
        <div className="bg-emerald-50 rounded-xl flex flex-col gap-2 p-2">
            <h1 className="font-sans font-semibold">Reviews</h1>
            {reviews?.data.length ? reviews?.data?.map((review: any, index: number) => (
                <div key={index} className="flex flex-col gap-1 p-2 bg-emerald-100 rounded-xl">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src={review?.userId?.avatar} />
                            </Avatar>
                            <h2 className="font-sans font-medium">{review?.userId?.username}</h2>
                        </div>
                        <span className="text-xs font-mono">{moment(review?.createdAt).fromNow()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <h2 className="font-mono">Rating:</h2>
                        <StarRating rating={review?.rating} />
                    </div>
                    <div>
                        <p className="text-mono font-medium">{review?.comment}</p>
                    </div>
                </div>
            )):<div className="flex flex-col items-center justify-center">
                <Image src={'/assets/no-data.svg'} alt="no-data" width={100} height={100}/>
            <h1 className="text-xl font-bold font-mono">No Reviews Yet</h1>
            </div>}
            <div className="flex flex-col gap-2">
                <h1 className="font-sans font-semibold">Give a Review</h1>
                <Textarea placeholder="Write Your Review" value={reviewMsg} onChange={(e) => setReviewMsg(e.target.value)} />
                <div className="self-end">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Submit</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add a Rating</DialogTitle>
                                <DialogDescription>
                                    Give a honest Rating out of 5 Stars
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center gap-2 justify-center">
                                <div onClick={() => setRating(prev => [...prev, 1])}>
                                    <Star className={`${rating.length >= 1 ? 'text-yellow-500' : ''}`} />
                                </div>
                                <div onClick={() => setRating(prev => [...prev, 2])}>
                                    <Star className={`${rating.length >= 2 ? 'text-yellow-500' : ''}`} />
                                </div>
                                <div onClick={() => setRating(prev => [...prev, 3])}>
                                    <Star className={`${rating.length >= 3 ? 'text-yellow-500' : ''}`} />
                                </div>
                                <div onClick={() => setRating(prev => [...prev, 4])}>
                                    <Star className={`${rating.length >= 4 ? 'text-yellow-500' : ''}`} />
                                </div>
                                <div onClick={() => setRating(prev => [...prev, 5])}>
                                    <Star className={`${rating.length >= 5 ? 'text-yellow-500' : ''}`} />
                                </div>
                            </div>
                            <DialogClose asChild>
                                <Button onClick={handleAddReview}>Submit Review</Button>
                            </DialogClose>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default DoctorReviews