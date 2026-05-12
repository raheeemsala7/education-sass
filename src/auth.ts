import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { HEADERS } from "./shared/constant/api.constant";
import { IApiResponse } from "./shared/lib/types/api";
import { IAuthResponse } from "./features/auth/types/auth";
import { IUser } from "./features/auth/types/user";



export const authOptions: NextAuthOptions = {
        secret: process.env.NEXTAUTH_SECRET,  // ← أضف السطر ده
        
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {

                if (!credentials?.email || !credentials?.password) {
                    return null
                }
                const res = await fetch(`${process.env.API_URL}/auth/login`, {
                    method: "POST",
                    headers: {
                        ...HEADERS.JsonBody,
                    },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password
                    })
                });

                const data: IApiResponse<IAuthResponse> = await res.json()
                
                if (data.status === "error") {
                    throw new Error(data.message || "Login failed")
                }
                // const loginData = data.payload

                console.log("TOKEN =>", data)
                console.log("PROFILE URL =>", `${process.env.API_URL}/profile`)


                const profileRes = await fetch(`${process.env.API_URL}/profile`, {
                    method: "GET",
                    headers: {
                        ...HEADERS.authorize(data.access_token)
                    }
                })


                const profileData: IApiResponse<IUser> = await profileRes.json()
                console.log("ProfileData : => ", profileData)

                if (profileData.status === "error") {
                    throw new Error(profileData.message || "Login failed")
                }

                console.log({
                       id: String(profileData.data.id),
                    user: profileData.data,
                    access_token: data.access_token,
                    role: data.role
                })
                
                return {
                    id: String(profileData.data.id),
                    user: profileData.data,
                    access_token: data.access_token,
                    role: data.role
                }
            }
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {

            if (user) {
                token.access_token = user.access_token
                token.user = user.user
                token.role = user.role
            }
            return token
        },
        session: async ({ session, token }) => {

            session.user = token.user
            session.role = token.role

            return session
        }
    }
} 