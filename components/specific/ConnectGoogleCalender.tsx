'use client'

import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

const ConnectGoogleCalender = () => {
    const {data:session}= useSession();
    const handleConnect = () => {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CALENDER_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_REDIRECT!,
      response_type: "code",
      scope: "https://www.googleapis.com/auth/calendar.events",
      access_type: "offline",
      prompt: "consent",
      state: encodeURIComponent(`doctorId=${session?.user.id}`), // optional to track doctor
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };
  return (
    <Button onClick={handleConnect}>Connect Google Calender</Button>
  )
}

export default ConnectGoogleCalender