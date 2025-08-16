import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    
    accessToken?: string;
    refreshToken?:string;
    expiresAt?:string
    user: {
      id: string;
      role: string;
      username:string;
      avatar:string;
      isVerified:boolean;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    role: string;
    isVerified: boolean;
    username:string;
    avatar:string;
  }
  
  
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string;
refreshToken?:string;
    expiresAt?:string
  }
}