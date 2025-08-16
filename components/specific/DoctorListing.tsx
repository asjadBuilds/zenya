'use client'
import { getDoctorsByCategory, getDoctorsByQuery } from '@/services/doctorApi'
import Image from 'next/image';
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Loader from './Loader';
type Props = {
    country?: string;
    city?: string;
    categoryId: string;
    query?: string
};
const DoctorListing = ({ categoryId, country = '', city = '', query = '' }: Props) => {
    const router = useRouter();
    const { data: doctors, isLoading: categoryDocLoading } = useQuery({
        queryKey: ['fetchDoctorsByCategory', categoryId, country, city],
        queryFn: () => getDoctorsByCategory(categoryId, country, city),
        enabled: !!categoryId
    })
    const { data: queryDoctors, isLoading: searchDocLoading } = useQuery({
        queryKey: ['fetchDoctorsByQuery', query],
        queryFn: () => getDoctorsByQuery(query),
        enabled: !!query
    })
    if(categoryDocLoading || searchDocLoading) return <Loader/> 
    return (
        <div className='flex flex-wrap gap-4 justify-start w-full px-10'>
            {doctors ? doctors?.data?.map((doctor: any, index: number) => (
                <div key={index} className='flex flex-col justify-between gap-2 bg-card text-foreground rounded-xl md:w-1/4 w-full shadow-md p-2 h-48'>
                    <div className='flex gap-3'>
                        <Image src={doctor?.avatar} alt={doctor?.fullname} width={100} height={100} className='rounded-xl'/>
                        <div className='flex flex-col justify-start gap-2'>
                            <h2 className='font-semibold font-sans'>{doctor?.fullname}</h2>
                            <Badge variant={!doctor?.isVerified ? 'destructive' : 'default'}>{!doctor?.isVerified ? 'Not PMC Verified' : 'PMC Verified'}</Badge>
                            <div className='flex items-center gap-1'>
                                <span className='text-xs font-mono'>Specialization: </span>
                                {doctor?.specialization.map((item: any, index:number) => (
                                    <Badge key={index} variant={'outline'}>{item}</Badge>
                                ))}
                            </div>
                            <span className='text-xs font-mono'>Location: <span className='font-medium'>{`${doctor?.city}, ${doctor?.country}`}</span></span>
                        </div>
                    </div>
                    <Button onClick={() => router.push(`/doctor/${doctor?.fullname}/${doctor?._id}`)}>View Details</Button>
                </div>
            )) :
                queryDoctors?.data?.map((doctor: any) => (
                    <div className='flex flex-col justify-between gap-2 bg-card  text-foreground rounded-xl w-1/4 shadow-md p-2 h-48'>
                        <div className='flex gap-3'>
                            <Image src={doctor?.avatar} alt={doctor?.fullname} width={100} height={100} />
                            <div className='flex flex-col justify-start gap-2'>
                                <h2 className='font-semibold font-sans'>{doctor?.fullname}</h2>
                                <Badge variant={!doctor?.isVerified ? 'destructive' : 'default'}>{!doctor?.isVerified ? 'Not PMC Verified' : 'PMC Verified'}</Badge>
                                <div className='flex items-center gap-1'>
                                    <span className='text-xs font-mono'>Specialization: </span>
                                    {doctor?.specialization.map((item: any) => (
                                        <Badge variant={'outline'}>{item}</Badge>
                                    ))}
                                </div>
                                <span className='text-xs font-mono'>Location: <span className='font-medium'>{`${doctor?.city}, ${doctor?.country}`}</span></span>
                            </div>
                        </div>
                        <Button>View Details</Button>
                    </div>
                ))
            }
        </div>
    )
}

export default DoctorListing