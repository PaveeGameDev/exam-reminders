import { Exam, User } from "@prisma/client";
import Link from "next/link";
import DayView from "@/app/components/DayView";
import BlankDay from "@/app/components/BlankDay";

type Props = {
  day: Date;
  exams: Exam[];
  user: User;
  clickableAll?: boolean;
};
export default async function DayViewWrap({ day, exams, user }: Props) {
  if (exams.length === 0) {
    return <BlankDay day={day} />;
  } else if (exams.length === 1) {
    return (
      <Link href={`/${exams[0].id}`}>
        <DayView day={day} exams={exams} user={user} clickableAll={true} />
      </Link>
    );
  } else {
    return <DayView day={day} exams={exams} user={user} clickableAll={false} />;
  }
}
