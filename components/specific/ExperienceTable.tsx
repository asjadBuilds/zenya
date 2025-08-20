'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { getDoctorEducation, getDoctorExperience } from "@/services/doctorApi"
import { useQuery } from "@tanstack/react-query"
import moment from "moment"
import Image from "next/image"
import { Button } from "../ui/button"
import { useState } from "react"
import AddEducation from "./AddEducation"
import EditEducation from "./EditEducation"
import DeleteEducation from "./DeleteEducation"
import AddExperience from "./AddExperience"
import EditExperience from "./EditExperience"
import DeleteExperience from "./DeleteExperience"
const ExperienceTable = () => {
    const { data } = useQuery({
        queryKey: ['fetchDoctorExperience'],
        queryFn: getDoctorExperience
    })
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [expId, setExpId] = useState('');
    const handleEditOpen = (experienceId: string) => {
        setExpId(experienceId);
        setOpenEdit(true)
    }
    const handleDeleteOpen = (experienceId:string)=>{
        setExpId(experienceId);
        setOpenDelete(true);
    }
  return (
   <>
            <div className="flex flex-col bg-card-primary rounded-xl gap-2 shadow-md m-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className=" font-sans font-semibold">Your Experience Record</h1>
                    <Button onClick={() => setOpenAdd(true)}>Add Experience</Button>
                </div>
                {data?.experience?.length ? <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Role</TableHead>
                            <TableHead>Institute Name</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.experience?.map((exp: any, index: number) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{exp?.role}</TableCell>
                                <TableCell>{exp?.instituteName}</TableCell>
                                <TableCell>{moment(exp?.startDate).format('MMMM Do YYYY')}</TableCell>
                                <TableCell>{moment(exp?.endDate).format('MMMM Do YYYY')}</TableCell>
                                <TableCell className="flex items-center gap-2">
                                    <Button variant={'outline'} onClick={() => handleEditOpen(exp?._id)}>Edit</Button>
                                    <Button variant={'destructive'} onClick={()=> handleDeleteOpen(exp?._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> :
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Image src={'/assets/no-data.svg'} alt="no-data" width={100} height={100} />
                        <h1 className="text-xl font-bold font-mono">No Experience</h1>
                    </div>}
            </div>
            <AddExperience open={openAdd} setOpen={setOpenAdd} />
            <EditExperience open={openEdit} setOpen={setOpenEdit} experienceId={expId} />
            <DeleteExperience open={openDelete} setOpen={setOpenDelete} experienceId={expId} />
        </>
  )
}

export default ExperienceTable