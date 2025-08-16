'use client'
import { Button } from '@/components/ui/button';
import { BriefcaseMedical, User } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
    const [role, setRole] = useState('USER');
    const router = useRouter();
  return (
    <div className='flex flex-col h-screen w-full items-center justify-center bg-gray-100'>
        <div className='flex flex-col text-center'>
            <h1 className='text-3xl font-bold font-sans text-primary'>Choose Your Role</h1>
            <p className='text-sm font-mono'>Select the Role from the options:</p>
        </div>
        <div className='flex max-md:flex-col items-center gap-8 mt-8'>
            <div className={`flex flex-col items-center justify-center rounded-2xl size-48 transition-colors duration-200 cursor-pointer ${role === 'USER' ? 'bg-emerald-100 border-2 border-primary text-primary' : ''}`} onClick={() => setRole('USER')}>
                <User size={100} />
                <span className='text-xl font-medium font-sans uppercase'>User</span>
            </div>
            <div className={`flex flex-col items-center justify-center rounded-2xl size-48 transition-colors duration-200 cursor-pointer ${role === 'DOCTOR' ? 'bg-emerald-100 border-2 border-primary text-primary' : ''}`} onClick={() => setRole('DOCTOR')}>
                <BriefcaseMedical size={100}/>
                <span className='text-xl font-medium font-sans uppercase'>Doctor</span>
            </div>
        </div>
        <Button variant={'default'} className='mt-8 px-8' onClick={()=>router.push(`/signup/${role}`)}>Continue</Button>
    </div>
  )
}

export default page