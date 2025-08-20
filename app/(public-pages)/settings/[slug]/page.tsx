
import AccountSettings from "@/components/specific/AccountSettings"
import PasswordSetting from "@/components/specific/PasswordSetting"
import UpdateAppointmentFees from "@/components/specific/UpdateAppointmentFees"
import UpdateAppointmentSlot from "@/components/specific/UpdateAppointmentSlot"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const page = async({params}:{params:Promise<{slug:string}>}) => {
    const {slug} = await params;
    const role = slug;
    return (
        <div className="flex flex-col gap-2 m-4">
            <h1 className="font-sans text-2xl font-semibold">Settings</h1>
            <Tabs defaultValue="account">
                <TabsList>
                    {role === 'doctor' && <TabsTrigger value="account">Account</TabsTrigger>}
                    <TabsTrigger value="password">Password</TabsTrigger>
                    {role==='doctor' && <TabsTrigger value="appointment">Appointment</TabsTrigger>}
                </TabsList>
                {role === 'doctor' && <TabsContent value="account"><AccountSettings/></TabsContent>}
                <TabsContent value="password">
                    <PasswordSetting role={role}/>
                </TabsContent>
                {role==='doctor' && <TabsContent value="appointment" asChild>
                    <div className="flex flex-col gap-4">
                        <UpdateAppointmentSlot />
                        <UpdateAppointmentFees />
                    </div>
                </TabsContent>}
            </Tabs>
        </div>
    )
}

export default page