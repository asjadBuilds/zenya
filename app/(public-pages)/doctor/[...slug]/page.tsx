import AppointmentListing from "@/components/specific/AppointmentListing"
import DoctorProfile from "@/components/specific/DoctorProfile"
import DoctorReviews from "@/components/specific/DoctorReviews"
import { getDoctorProfile } from "@/services/doctorApi"
import { getDoctorReviews } from "@/services/reviewApi"
import getQueryClient from "@/utils/queryClient"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const queryClient = getQueryClient();
  const { slug } = await params
  const [name, id] = slug
  queryClient.prefetchQuery({
    queryKey: ['fetchDoctorProfile', id],
    queryFn: () => getDoctorProfile(id)
  })
  queryClient.prefetchQuery({
    queryKey: ['fetchReviews', id],
    queryFn: () => getDoctorReviews(id)
  })
  queryClient.prefetchQuery({
    queryKey: ['fetchDoctorProfile', id],
    queryFn: () => getDoctorProfile(id)
  })
  return (
    <div className="flex max-md:flex-col items-start gap-4 w-full p-8">
      <div className="md:w-1/2 w-full flex flex-col gap-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DoctorProfile doctorId={id} />
      </HydrationBoundary>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DoctorReviews doctorId={id} />
      </HydrationBoundary>
      </div>
      <div className="md:w-1/2 w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AppointmentListing doctorId={id} />
      </HydrationBoundary>
      </div>
    </div>
  )
}

export default page