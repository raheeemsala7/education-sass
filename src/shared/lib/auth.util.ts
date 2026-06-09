"use server"

import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"


export async function getNextAuthToken() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get(process.env.NEXT_AUTH_SESSION_COOKIE_NAME!)?.value



  try {
    const jwt = decode({
      token,
      secret: process.env.NEXTAUTH_SECRET!,
    })
    return jwt
  } catch (error) {
    void error;
    return null;
  }
}