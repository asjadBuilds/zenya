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
                <p className="text-sm text-neutral-400 font-mono">Welcome to Zenya – your trusted partner for instant medical consultations. We bring certified doctors to your fingertips, making healthcare accessible anytime, anywhere. Whether you need quick advice, a detailed consultation, or answers to health concerns, Zenya ensures convenience without compromising quality. Say goodbye to long waiting rooms and hello to expert care from the comfort of your home. Your health, your time, our priority</p>
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