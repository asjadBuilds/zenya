import Header from "@/components/specific/Header";
import React from "react";
import VerifyDoctorAlert from "@/components/specific/VerifyDoctorAlert";
export default function PublicLayout({ children }: { children: React.ReactNode }) {

    return (
        <div>
            <Header />
            <VerifyDoctorAlert/>
            {children}
        </div>
    )
}
