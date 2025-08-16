'use client'
import { useSession } from "next-auth/react"
import { Button } from "../ui/button"
const verifyDoctorAlert = () => {
    const { data: session } = useSession();
    const role = session?.user.role;
    const isVerified = session?.user?.isVerified;
    return (
        <div>
            {role === 'doctor' && !isVerified ?
                <div className="flex items-center justify-between p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                    <div className="flex items-center">
                        <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">Verify Your Account</span> You are not verified from PMC. Verify Your Account Now.
                        </div>
                    </div>
                    <Button>Verify Now</Button>
                </div> : <></>}
        </div>
    )
}

export default verifyDoctorAlert