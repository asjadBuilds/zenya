import { fetchCategories } from '@/services/categoryApi';
import getQueryClient from '@/utils/queryClient';
import SearchDoctor from './SearchDoctor';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import CategoryListing from './CategoryListing';

const UserHome = async() => {
    
    const queryClient = getQueryClient();
    queryClient.prefetchQuery({
        queryKey: ['fetchCategories'],
        queryFn: fetchCategories,
    })
  return (
    
    <div className="flex flex-col gap-24 mt-24 bg-background">
            <div className="flex flex-col gap-3 max-w-3xl justify-center items-center text-center mx-auto">
                <h1 className="text-3xl font-bold font-sans">Find the best <span className="text-primary">Doctor</span> who can consult you with his <span className="text-primary">Experience</span></h1>
                <p className="text-sm text-neutral-400 font-mono">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus vel pariatur impedit minima quam? Adipisci facere facilis ab omnis enim, perspiciatis voluptates illum, consequatur quibusdam animi, dolore magni numquam eveniet sunt corrupti maxime repudiandae debitis iste labore. Illo error fuga soluta, obcaecati, aliquam laboriosam saepe sequi ipsam, temporibus dolore aut.</p>
                <SearchDoctor />
            </div>
            <div className="flex flex-col gap-12 text-center">
                <h1 className="text-3xl font-bold text-primary font-sans">Search Doctors By Category</h1>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <CategoryListing />
                </HydrationBoundary>
            </div>
        </div>

  )
}

export default UserHome