// app/lib/auth.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function isAuthenticated(req : any) {
  const session = await getServerSession(authOptions);
  return !!session;
}