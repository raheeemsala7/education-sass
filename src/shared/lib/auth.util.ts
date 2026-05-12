"use server"

import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"


export async function getNextAuthToken() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get(process.env.NEXT_AUTH_SESSION_COOKIE_NAME!)?.value



  try {
    const jwt = decode({
      token,
      secret: "5a0129a7a241deb0a4361f08857b244fb3c0decd65d58850071c7c0678de28fb",
    })
    return jwt
  } catch (error) {
    void error;
    return null;
  }
}