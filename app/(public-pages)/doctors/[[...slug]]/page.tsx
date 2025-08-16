import DoctorListing from '@/components/specific/DoctorListing'
import LocationFilter from '@/components/specific/LocationFilter'
import React from 'react'

type PageProps = {
    params: Promise<{
        slug?: string[];
    }>;
    searchParams: Promise<{
        country?: string;
        state?: string;
        city?: string;
        search?: string;
    }>;
};
const page = async ({ params, searchParams }: PageProps) => {
    let id: string | undefined;
    let doctorName: string | undefined;
    const { slug } = await params;
    if (slug && slug.length >= 2) {
        const [title, categoryId] = slug;
        console.log(slug)
        doctorName = title
        id = categoryId;
    }
    const { search, country, state, city } = await searchParams
    const queryDoctor = search ? decodeURIComponent(search) : "";
    return (
        <div className='flex flex-col items-center gap-8'>
            <h1 className='text-3xl font-bold max-md:text-center'>{doctorName || queryDoctor}</h1>
            <LocationFilter />
            <DoctorListing
                categoryId={id || ""}
                country={country || ""}
                city={city || ""}
                query={search || ""} />
        </div>
    )
}

export default page