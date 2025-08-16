
import Datepicker from "@/components/specific/Datepicker"
import UpdateAppointmentFees from "@/components/specific/UpdateAppointmentFees"
import UpdateAppointmentSlot from "@/components/specific/UpdateAppointmentSlot"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const page = () => {

    return (
        <div className="flex flex-col gap-2 m-4">
            <h1 className="font-sans text-2xl font-semibold">Settings</h1>
            <Tabs defaultValue="account">
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="appointment">Appointment</TabsTrigger>
                </TabsList>
                <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
                <TabsContent value="appointment" asChild>
                    <div className="flex flex-col gap-4">
                        <UpdateAppointmentSlot />
                        <UpdateAppointmentFees />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default page