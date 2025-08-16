import DoctorListing from '@/components/specific/DoctorListing'
import LocationFilter from '@/components/specific/LocationFilter'
import getQueryClient from '@/utils/queryClient'
import React from 'react'

type Props = {
    searchParams: {
        country: string,
        state: string,
        city: string,
        search: string
    },
    params: {
        slug: string[]
    }
}
const page = async({ params, searchParams }: Props) => {
    let id, title;
    let doctorName
    if (params.slug) {
        [title, id] = await params.slug;
        doctorName = decodeURIComponent(title)
    }
    const { country, state, city, search } = await searchParams;
    const queryDoctor = decodeURIComponent(search)
    return (
        <div className='flex flex-col items-center gap-8'>
            <h1 className='text-3xl font-bold max-md:text-center'>{doctorName || queryDoctor}</h1>
            <LocationFilter />
            <DoctorListing categoryId={id!} country={country} city={city} query={search} />
        </div>
    )
}

export default page