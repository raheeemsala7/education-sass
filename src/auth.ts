import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { HEADERS } from "./shared/constant/api.constant";
import { IApiResponse } from "./shared/lib/types/api";
import { IAuthResponse } from "./features/auth/types/auth";



export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: "jwt",
        maxAge: 60 * 60,
    },

    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
                device_id: {},
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
                        password: credentials.password,
                        device_id: credentials.device_id,
                    })
                });

                const payload: IApiResponse<IAuthResponse> = await res.json()

                console.log("PAYLOAD")
                console.log(payload)

                if (!payload.status) {
                    throw new Error(payload.message || "Login failed")
                }
                const loginData = payload.data
                return {
                    id: String(loginData.user.id),
                    user: loginData.user,
                    access_token: loginData.access_token,
                    role: loginData.user.role
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