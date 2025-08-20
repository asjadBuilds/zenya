'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEducation, deleteExperience } from "@/services/doctorApi";
import { toast } from "sonner";

type deleteExpProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    experienceId:string
}

const DeleteExperience = ({ open, setOpen, experienceId }: deleteExpProps) => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn:deleteExperience,
        onSuccess:(response)=>{
            toast.success(response?.message);
            setOpen(false);
            queryClient.invalidateQueries({
                queryKey:['fetchDoctorExperience']
            })
        },
        onError:(error:any)=>{
            toast.error(error?.response?.data?.error)
        }
    })
  return (
     <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Experience</DialogTitle>
                    <DialogDescription>
                        Are You Sure You want to delete that record Item
                    </DialogDescription>
                </DialogHeader>
                <Button onClick={()=>mutate(experienceId)}>Delete</Button>
            </DialogContent>
        </Dialog>
  )
}

export default DeleteExperience