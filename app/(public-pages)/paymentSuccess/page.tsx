'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"

const page = () => {
  const router = useRouter();
  return (
     <div className="flex flex-col items-center justify-center gap-3 min-h-screen text-center bg-background">
      <h1 className="text-3xl font-bold font-sans text-primary">Payment Successful! 🎉</h1>
      <p className="font-mono text-neutral-400">Thank you for your booking. Your appointment has been confirmed.</p>
      <Button onClick={()=>router.push('/')}>Continue</Button>
    </div>
  )
}

export default page