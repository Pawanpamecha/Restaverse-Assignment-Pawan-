import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import { getServerSession } from "next-auth";

export default async function getSession() {
  return await getServerSession(authOptions);
}
