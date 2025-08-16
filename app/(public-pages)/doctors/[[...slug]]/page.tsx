import DoctorListing from '@/components/specific/DoctorListing'
import LocationFilter from '@/components/specific/LocationFilter'
import React from 'react'

type PageProps = {
  params: {
    slug?: string[];
  };
  searchParams: {
    country?: string;
    state?: string;
    city?: string;
    search?: string;
  };
};
const page = async({ params, searchParams }: PageProps) => {
    let id: string | undefined;
  let doctorName: string | undefined;

  if (params.slug && params.slug.length >= 2) {
    const [title, categoryId] = params.slug;
    doctorName = decodeURIComponent(title);
    id = categoryId;
  }
     const queryDoctor = searchParams.search ? decodeURIComponent(searchParams.search) : "";
    return (
        <div className='flex flex-col items-center gap-8'>
            <h1 className='text-3xl font-bold max-md:text-center'>{doctorName || queryDoctor}</h1>
            <LocationFilter />
            <DoctorListing 
            categoryId={id || ""}
        country={searchParams.country || ""}
        city={searchParams.city || ""}
        query={searchParams.search || ""} />
        </div>
    )
}

export default page