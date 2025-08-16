'use client'
import { getDoctorProfile } from "@/services/doctorApi"
import Image from "next/image"
import { Badge } from "../ui/badge"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import moment from 'moment'
import { number } from "zod"
import { useQuery } from "@tanstack/react-query"
type Props = {
    doctorId: string
}

const DoctorProfile = ({ doctorId }: Props) => {
    const { data: doctor } = useQuery({
        queryKey: ['fetchDoctorProfile', doctorId],
        queryFn: () => getDoctorProfile(doctorId),
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })
    return (
        <div className="flex flex-col w-full gap-4">
            <div className=" bg-card-primary rounded-xl flex flex-col">
                <div className="flex max-md:flex-col items-center justify-between p-4">
                    <Image src={doctor?.data?.avatar || '/assets/zenya-logo-green.png'} alt={doctor?.data?.fullname || 'user'} width={200} height={200} className="rounded-full border-4 border-primary" />
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center max-md:items-start gap-1">
                            <span className="font-mono">Full Name:</span>
                            <h2 className="font-sans font-medium">{doctor?.data?.fullname}</h2>
                        </div>
                        <div className="flex items-center max-md:items-start gap-1">
                            <span className="font-mono">Verification Status:</span>
                            <Badge variant={!doctor?.isVerified ? 'destructive' : 'default'}>{doctor?.data?.isVerified ? 'PMC Verified' : 'Not PMC Verified'}</Badge>
                        </div>
                        <div className="flex items-center max-md:items-start gap-1">
                            <span className="font-mono">Location:</span>
                            <h2 className="font-sans font-medium">{doctor?.data?.city}, {doctor?.data?.country}</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-mono">Specialization:</span>
                            {doctor?.data.specialization?.map((item: any, index: number) => (
                                <span key={index} className="font-sans font-medium">{item}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-card-primary rounded-xl p-4">
                <h1 className="font-sans font-semibold">Experience</h1>
                {doctor?.data?.experience?.length ? <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Role</TableHead>
                            <TableHead>Institute Name</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {doctor?.data?.experience?.map((exp: any, index: number) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{exp?.role}</TableCell>
                                <TableCell>{exp?.instituteName}</TableCell>
                                <TableCell>{moment(exp.startDate).format('MMMM Do YYYY')}</TableCell>
                                <TableCell>{moment(exp.endDate).format('MMMM Do YYYY')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> :
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Image src={'/assets/no-data.svg'} alt="no-data" width={100} height={100} />
                        <h1 className="text-xl font-bold font-mono">No Experience</h1>
                    </div>}

            </div>
            <div className="bg-card-primary rounded-xl p-4">
                <h1 className="font-sans font-semibold">Education</h1>
                {doctor?.data?.education?.length ? <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Degree Name</TableHead>
                            <TableHead>Institute Name</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {doctor?.data?.education?.map((edu: any, index: number) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{edu?.degreeName}</TableCell>
                                <TableCell>{edu?.instituteName}</TableCell>
                                <TableCell>{moment(edu?.startDate).format('MMMM Do YYYY')}</TableCell>
                                <TableCell>{moment(edu?.endDate).format('MMMM Do YYYY')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> : <div className="flex flex-col items-center justify-center gap-2">
                    <Image src={'/assets/no-data.svg'} alt="no-data" width={100} height={100} />
                    <h1 className="text-xl font-bold font-mono">No Education</h1>
                </div>}
            </div>
        </div>
    )
}

export default DoctorProfile