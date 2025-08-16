import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { login, registerSocialUser, saveRefreshToken } from "@/services/authApi";
import { cookies } from "next/headers";
import axios from "axios";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Missing Credentials from authorize")
                }
                try {
                    const res = await login({ email: credentials.email, password: credentials.password })
                    const { id, email, role, isVerified, username, avatar, accessToken, refreshToken } = res.data;
                    // console.log('accessToken: ', accessToken, 'refreshToken: ', refreshToken)
                    const cookie = await cookies();
                    cookie.set("accessToken", accessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "lax",
                        maxAge: 60 * 60 * 8 // 8 hours
                    });

                    cookie.set("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "lax",
                        maxAge: 60 * 60 * 24 * 7 // 7 days
                    });
                    return {
                        id,
                        email,
                        role,
                        username,
                        avatar,
                        isVerified
                    }
                } catch (error) {
                    console.error("Auth Error: ", error)
                    throw error
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            const hasValidAvatar = user.image || user.avatar;
            if (!user.email || !hasValidAvatar || !user.id) {
                throw new Error("Missing Credentials from sign in")
            }
            try {
                const res = await registerSocialUser(user.email, user.id, user.image || '');
                const { accessToken, refreshToken } = res.data;
                const cookie = await cookies();
                cookie.set("accessToken", accessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "lax",
                    maxAge: 60 * 60 * 8 // 8 hours
                });

                cookie.set("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "lax",
                    maxAge: 60 * 60 * 24 * 7 // 7 days
                });

                return true;
            } catch (error) {
                console.error("Error registering user:", error);
                return false;
            }
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id
                token.role = user.role
                token.username = (user as any).username;
                token.avatar = (user as any).avatar;
                token.isVerified = user.isVerified
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
                session.user.username = token.username as string;
                session.user.avatar = token.avatar as string;
                session.user.isVerified = token.isVerified as boolean
            }
            return session
        }
    },
    pages: {
        signIn: '/',
        error: '/'
    },
    session: {
        strategy: 'jwt',
        maxAge: 8 * 60 * 60,
    },
    jwt: {
        maxAge: 8 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
}