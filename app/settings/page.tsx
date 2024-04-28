import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import UserInfo from "@/app/components/UserInfo";
import JoinClass from "@/app/components/JoinClass";
import MyClass from "@/app/components/MyClass";
import InstallPWA from "@/app/components/InstallPWA";
export default async function Settings() {
  const session = await getServerSession(authOptions);
  if (!session) return "Přihlaste se, abyste mohli pokračovat";
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return "An error occurred";
  return (
    <main className="flex justify-center">
      <div className="space-y-5 w-full max-w-md mx-auto">
        <UserInfo user={user} />
        <JoinClass />
        <MyClass myClassId={user.classId || null} />
        <InstallPWA />
      </div>
    </main>
  );
}
