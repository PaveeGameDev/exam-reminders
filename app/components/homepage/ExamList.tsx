import prisma from "@/prisma/client";
import DayViewWrap from "@/app/components/DayViewWrap";
import HorizontalLine1 from "@/app/components/decorations/HorizontalLine1";
import { Exam, User } from "@prisma/client";
import { MinMaxDate } from "@/app/types/types";
import AdvertisementManager from "@/app/components/homepage/AdvertisementManager";
import Advertisement from "@/app/components/homepage/Advertisement";
import randomIntFromInterval from "@/functions/randomIntFromInterval";

type Props = {
  user: User;
  exams: Exam[];
  datesToShow?: MinMaxDate;
};

export default async function ExamList({ exams, user, datesToShow }: Props) {
  const dayViewWrappers = [];

  const date = datesToShow?.minDate ? datesToShow.minDate : new Date();

  const datesToDisplay = datesToShow?.maxDate
    ? Math.round(
        (datesToShow.maxDate.getTime() - datesToShow.minDate.getTime()) /
          (1000 * 3600 * 24),
      ) + 1
    : 30;

  let plantedAdvert: boolean = false;

  if (
    exams.length === 0 &&
    !plantedAdvert &&
    randomIntFromInterval(1, 2) === 1
  ) {
    dayViewWrappers.push(
      <Advertisement
        header="Nic nepíšeš, je to možný?"
        actionButtonText="Přidat test"
        actionButtonRedirect="/write"
        showDownBar={true}
        key="addTestAdvert"
      >
        <ul className="list-disc ml-10">
          <li>Možná jsi šťastlivec a vážně nic nepíšeš.</li>
          <li>
            Možná tu <p className="font-semibold inline">schází nějaký test</p>,
            přidej ho.
          </li>
          <li>
            <p className="font-semibold inline">Pozvi spolužáky</p> a zapisujte
            testy spolu.
          </li>
        </ul>
      </Advertisement>,
    );
    plantedAdvert = true;
  }

  if (randomIntFromInterval(1, 2) === 1) {
    const users = await prisma.class
      .findUnique({ where: { id: user.classId! } })
      .users();
    if (users && users.length <= 10 && !plantedAdvert) {
      dayViewWrappers.push(
        <Advertisement
          header="Je tady nějak pusto"
          actionButtonText="Sdílej Co Píšem"
          showDownBar={true}
          key="invitePeopleAdvert"
          extras="share"
        >
          <ul className="list-disc ml-10">
            <li>Co Píšem funguje nejlépe ve více lidech.</li>
            <li>
              Celá třída se může{" "}
              <p className="font-semibold inline">snadno připojit</p>, stačí jen
              poslat odkaz.
            </li>
            <li>
              <p className="font-semibold inline">Pozvi spolužáky</p> a
              zapisujte testy spolu.
            </li>
          </ul>
        </Advertisement>,
      );
      plantedAdvert = true;
    }
  }

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
        if (!plantedAdvert && dayViewWrappers.length >= 4) {
          dayViewWrappers.push(<AdvertisementManager user={user} key={i} />);
          plantedAdvert = true;
        }
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
  return <div>{dayViewWrappers}</div>;
}
