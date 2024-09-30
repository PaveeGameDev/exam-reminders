import {authOptions} from "@/app/api/auth/authOptions";
import {getServerSession} from "next-auth";
import prisma from "@/prisma/client";
import CreateClassForm from "@/app/components/CreateClassForm";
import NoLogin from "@/app/components/Errors/NoLogin";
import NoUser from "@/app/components/Errors/NoUser";
import {Footer} from "../components/Footer";

export default async function CreateClass() {
    const session = await getServerSession(authOptions);
    if (!session) return <NoLogin/>;
    const user = await prisma.user.findUnique({
        where: {email: session.user!.email!},
    });
    if (!user) return <NoUser/>;
    const defaultSubjects = process.env.LANGUAGE === 'EN' ? await prisma.subjectEnglish.findMany({}) : await prisma.subject.findMany({});

    return (
        <>
            <main className="flex justify-center m-3">
                <CreateClassForm defaultSubjects={defaultSubjects} user={user}/>
            </main>
            <Footer/>
        </>
    );
}
