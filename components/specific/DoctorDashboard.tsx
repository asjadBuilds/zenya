import Image from "next/image"
import { Button } from "../ui/button"
import TodayAppointments from "./TodayAppointments"
import ReviewTable from "./ReviewTable";

const DoctorDashboard = async(session:any) => {
    const username = session?.session?.user?.username;
  return (
    <div className="flex flex-col">
        <div className="flex justify-between items-center bg-gray-100 rounded-xl shadow-md m-4 p-2">
            <div className="flex flex-col w-1/2 gap-2">
                <h1 className="text-3xl font-bold font-sans">Hello Dr. <span className="text-primary">{username}!</span> </h1>
                <p className="text-sm font-mono text-neutral-400">Welcome to your Dashboard. You can see your Insights, Manage Your Appointments, Change Your Appointment Settings and Customize Your Profile</p>
                <Button className="w-1/2 mt-2">See Your Appointments</Button>
            </div>
            <Image src={'/assets/welcome-doctor.png'} alt="welcome-doctor" width={200} height={200}/>
        </div>
        <TodayAppointments/>
        <ReviewTable/>
    </div>
  )
}

export default DoctorDashboard