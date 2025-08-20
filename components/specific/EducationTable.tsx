'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { getDoctorEducation } from "@/services/doctorApi"
import { useQuery } from "@tanstack/react-query"
import moment from "moment"
import Image from "next/image"
import { Button } from "../ui/button"
import { useState } from "react"
import AddEducation from "./AddEducation"
import EditEducation from "./EditEducation"
import DeleteEducation from "./DeleteEducation"
const EducationTable = () => {
    const { data } = useQuery({
        queryKey: ['fetchDoctorEducation'],
        queryFn: getDoctorEducation
    })
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [eduId, setEduId] = useState('')
    const handleEditOpen = (educationId: string) => {
        setEduId(educationId);
        setOpenEdit(true)
    }
    const handleDeleteOpen = (educationId:string)=>{
        setEduId(educationId);
        setOpenDelete(true);
    }
    return (
        <>
            <div className="flex flex-col bg-card-primary rounded-xl gap-2 shadow-md m-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className=" font-sans font-semibold">Your Education Record</h1>
                    <Button onClick={() => setOpenAdd(true)}>Add Education</Button>
                </div>
                {data?.education?.length ? <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Degree Name</TableHead>
                            <TableHead>Institute Name</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.education?.map((edu: any, index: number) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{edu?.degreeName}</TableCell>
                                <TableCell>{edu?.instituteName}</TableCell>
                                <TableCell>{moment(edu?.startDate).format('MMMM Do YYYY')}</TableCell>
                                <TableCell>{moment(edu?.endDate).format('MMMM Do YYYY')}</TableCell>
                                <TableCell className="flex items-center gap-2">
                                    <Button variant={'outline'} onClick={() => handleEditOpen(edu?._id)}>Edit</Button>
                                    <Button variant={'destructive'} onClick={()=> handleDeleteOpen(edu?._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> :
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Image src={'/assets/no-data.svg'} alt="no-data" width={100} height={100} />
                        <h1 className="text-xl font-bold font-mono">No Education</h1>
                    </div>}
            </div>
            <AddEducation open={openAdd} setOpen={setOpenAdd} />
            <EditEducation open={openEdit} setOpen={setOpenEdit} educationId={eduId} />
            <DeleteEducation open={openDelete} setOpen={setOpenDelete} educationId={eduId} />
        </>
    )
}

export default EducationTable