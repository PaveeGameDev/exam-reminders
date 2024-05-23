import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import UserInfo from "@/app/components/UserInfo";
import JoinClass from "@/app/components/JoinClass";
import MyClass from "@/app/components/MyClass";
import InstallPWA from "@/app/components/InstallPWA";
import SubjectPreferenceWrapper from "@/app/components/settings/SubjectPreferenceWrapper";
import Notifications from "@/app/components/Notifications";
export default async function Settings() {
  const session = await getServerSession(authOptions);
  if (!session) return "Přihlaste se, abyste mohli pokračovat";
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return "An error occurred";
  let usersClass = null;
  if (user.classId) {
    usersClass = await prisma.class.findUnique({
      where: { id: user.classId },
    });
  }
  return (
    <main className="flex justify-center">
      <div className="space-y-5 w-full max-w-md mx-auto">
        {/*<Notifications*/}
        {/*  FB_API_KEY={process.env.FIREBASE_API_KEY!}*/}
        {/*  FB_measurement_id={process.env.FIREBASE_MEASUREMENT_ID!}*/}
        {/*/>*/}
        <InstallPWA />
        <UserInfo user={user} />
        <JoinClass />
        <MyClass myClass={usersClass} />
        <SubjectPreferenceWrapper user={user} />
      </div>
    </main>
  );
}
