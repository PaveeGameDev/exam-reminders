import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import UserInfo from "@/app/components/UserInfo";
import JoinClass from "@/app/components/JoinClass";
export default async function Settings() {
  const session = await getServerSession(authOptions);
  if (!session) return "Login to continue";
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return "An error occurred";

  return (
    <main className="flex justify-center p-6">
      <div className="space-y-11 w-full max-w-md mx-auto">
        <UserInfo user={user} />
        <JoinClass />
      </div>
    </main>
  );
}
