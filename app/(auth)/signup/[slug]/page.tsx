
import React from 'react'
import Image from 'next/image'
import RegisterDoctor from '@/components/specific/RegisterDoctor'
import RegisterUser from '@/components/specific/RegisterUser';

const page = async({ params }: { params: Promise<{ slug: string }>}) => {
  const {slug} = await params;
  console.log(slug)
  return (
    <div className='flex flex-col md:h-screen items-center justify-center bg-emerald-100'>
      <div className='flex flex-col gap-8 bg-white w-full md:max-w-3xl p-4 rounded-2xl shadow-lg overflow-y-auto'>
        <Image priority src={'/assets/zenya-logo-green.png'} alt='logo-green' width={100} height={100} className='mx-auto' />
        {slug === 'DOCTOR' && <RegisterDoctor/>}
        {slug === 'USER' && <RegisterUser/>}
      </div>
    </div>
  )
}

export default page