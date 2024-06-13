import DayViewWrap from "@/app/components/DayViewWrap";
import HorizontalLine1 from "@/app/components/decorations/HorizontalLine1";
import { Exam, User } from "@prisma/client";
import { MinMaxDate } from "@/app/types/types";
import Advertisement from "@/app/components/homepage/Advertisement";

type Props = {
  user: User;
  exams: Exam[];
  datesToShow?: MinMaxDate;
};

export default function ExamList({ exams, user, datesToShow }: Props) {
  const dayViewWrappers = [];

  const date = datesToShow?.minDate ? datesToShow.minDate : new Date();

  const datesToDisplay = datesToShow?.maxDate
    ? Math.round(
        (datesToShow.maxDate.getTime() - datesToShow.minDate.getTime()) /
          (1000 * 3600 * 24),
      ) + 1
    : 30;

  for (let i = 0; i < datesToDisplay; i++) {
    const examsOnTheDay = exams.filter(
      (exam) =>
        exam.date.getDate() === date.getDate() &&
        exam.date.getMonth() === date.getMonth(),
    );

    if (examsOnTheDay.length > 0) {
      if (date.getDay() == 5) {
        dayViewWrappers.push(
          <div key={i}>
            <DayViewWrap
              day={new Date(date)}
              exams={examsOnTheDay}
              user={user}
              key={i}
            />
            <HorizontalLine1 />
          </div>,
        );
      } else {
        dayViewWrappers.push(
          <DayViewWrap
            day={new Date(date)}
            exams={examsOnTheDay}
            user={user}
            key={i}
          />,
        );
      }
    } else {
      if (date.getDay() == 5) {
        dayViewWrappers.push(
          <div key={i}>
            <DayViewWrap
              day={new Date(date)}
              exams={examsOnTheDay}
              user={user}
              key={i}
            />
            <HorizontalLine1 />
          </div>,
        );
      } else if (date.getDay() == 6) {
      } else if (date.getDay() == 0) {
        dayViewWrappers.push(
          <Advertisement
            header="i"
            actionButtonText="kjfklda"
            actionButtonRedirect="https://burza.gymnazium-opatov.cz"
            showDownBar={true}
          >
            <p>hjfkl;dahfklj</p>
          </Advertisement>,
        );
      } else {
        dayViewWrappers.push(
          <DayViewWrap
            day={new Date(date)}
            exams={examsOnTheDay}
            user={user}
            key={i}
          />,
        );
      }
    }

    date.setDate(date.getDate() + 1);
  }
  return <>{dayViewWrappers}</>;
}
