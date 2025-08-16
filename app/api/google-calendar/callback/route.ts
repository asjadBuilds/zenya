import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { saveRefreshToken } from "@/services/authApi";
export async function GET(req: NextRequest) {
    console.log('handler called')
    try {
        // Extract `code` and `state` from query params
        const { searchParams } = new URL(req.url);
        const code = searchParams.get("code");
        const state = searchParams.get("state"); // Example: "doctorId=123"

        if (!code) {
            return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
        }
        console.log(state)
        const decodedState = decodeURIComponent(state || "");
        const doctorId = decodedState.split("=")[1] || null;
        console.log(doctorId)
        if (!doctorId) {
            return NextResponse.json({ error: "Missing doctor ID in state" }, { status: 400 });
        }

        // Create OAuth2 client
        const oauth2Client = new google.auth.OAuth2(
            process.env.NEXT_PUBLIC_GOOGLE_CALENDER_CLIENT_ID!,
            process.env.NEXT_PUBLIC_GOOGLE_CALENDER_CLIENT_SECRET,
            process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_REDIRECT
        );

        console.log('oauth client created')

        // Exchange code for tokens
        const { tokens } = await oauth2Client.getToken(code);

        if (!tokens.refresh_token) {
            return NextResponse.json(
                { error: "No refresh token returned. Try connecting again with prompt=consent." },
                { status: 400 }
            );
        }

        // Store refresh_token in DB for doctor
        const res = await saveRefreshToken({ token: tokens.refresh_token, doctorId });
        console.log(res);


        if (!res) return NextResponse.json({ error: "Tokens failed to save in database" }, { status: 400 });
        
        // Redirect back to dashboard with success
        return NextResponse.redirect(new URL('/', req.url));


    } catch (error) {
        console.error("Google Calendar callback error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}