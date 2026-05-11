import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { HEADERS } from "./shared/constant/api.constant";
import { IApiResponse } from "./shared/lib/types/api";
import { IAuthResponse } from "./features/auth/types/auth";
import { IUser } from "./features/auth/types/user";



export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const res = await fetch(`${process.env.API_URL}/auth/login`, {
                    method: "POST",
                    ...HEADERS.JsonBody,
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password
                    })
                });

                const data: IApiResponse<IAuthResponse> = await res.json()

                if (data.status === "error") {
                    throw new Error(data.message || "Login failed")
                }
                const loginData = data.payload

                const profileRes = await fetch(`${process.env.API_URL}//profile`, {
                    method: "GET",
                    headers: {
                        ...HEADERS.authorize(loginData.access_token)
                    }
                })
                const profileData: IApiResponse<IUser> = await profileRes.json()

                if (profileData.status === "error") {
                    throw new Error(profileData.message || "Login failed")
                }

                return {
                    id: profileData.payload.id,
                    user: profileData.payload,
                    access_token: loginData.access_token
                }
            }
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {

            if (user) {
                token.access_token = user.access_token
                token.user = user.user
            }
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user
            session.access_token = token.access_token

            return session
        }
    }
} 