import DoctorDashboard from "@/components/specific/DoctorDashboard";
import Header from "@/components/specific/Header";
import UserHome from "@/components/specific/UserHome";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
    const role = session?.user?.role;
  return (
    <>
    <Header/>
    {(!role || role === 'user') && <UserHome/>}
    {role === 'doctor' && <DoctorDashboard session={session}/>}
    </>
  );
}