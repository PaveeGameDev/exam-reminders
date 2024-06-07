import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import UserInfo from "@/app/components/UserInfo";
import JoinClass from "@/app/components/JoinClass";
import MyClass from "@/app/components/MyClass";
import InstallPWA from "@/app/components/InstallPWA";
import SubjectPreferenceWrapper from "@/app/components/settings/SubjectPreferenceWrapper";
import Notifications from "@/app/components/Notifications";
import NoLogin from "@/app/components/Errors/NoLogin";
import NoUser from "@/app/components/Errors/NoUser";
export default async function Settings() {
  const session = await getServerSession(authOptions);
  if (!session) return <NoLogin />;
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return <NoUser />;
  let usersClass = null;
  if (user.classId) {
    usersClass = await prisma.class.findUnique({
      where: { id: user.classId },
    });
  }
  return (
    <main className="flex justify-center m-3">
      <div className="space-y-5 w-full max-w-md mx-auto">
        {usersClass && (
          <>
            <Notifications
              FB_API_KEY={process.env.FIREBASE_API_KEY!}
              FB_measurement_id={process.env.FIREBASE_MEASUREMENT_ID!}
              user={user}
            />
            <InstallPWA />
            <MyClass myClass={usersClass} />
          </>
        )}
        <UserInfo user={user} />
        <JoinClass />
        {usersClass && (
          <>
            <SubjectPreferenceWrapper user={user} />
          </>
        )}
      </div>
    </main>
  );
}
