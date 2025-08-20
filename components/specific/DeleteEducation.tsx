'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEducation } from "@/services/doctorApi";
import { toast } from "sonner";

type deleteEduProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    educationId:string
}

const DeleteEducation = ({ open, setOpen, educationId }: deleteEduProps) => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn:deleteEducation,
        onSuccess:(response)=>{
            toast.success(response?.message);
            setOpen(false);
            queryClient.invalidateQueries({
                queryKey:['fetchDoctorEducation']
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
                    <DialogTitle>Delete Education</DialogTitle>
                    <DialogDescription>
                        Are You Sure You want to delete that record Item
                    </DialogDescription>
                </DialogHeader>
                <Button onClick={()=>mutate(educationId)}>Delete</Button>
            </DialogContent>
        </Dialog>
  )
}

export default DeleteEducation