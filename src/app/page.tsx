import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <h4>Hello {session?.user.email}</h4>
  );
}
