"use client";
import { User } from "@prisma/client";
import { isPWA } from "@/functions/isPWA";
import Advertisement from "@/app/components/homepage/Advertisement";
import { ReactNode, useEffect, useState } from "react";
import { getOS } from "@/functions/getOS";

type Props = {
  user: User;
};
export default function AdvertisementManager({ user }: Props) {
  const hasNotifications = Boolean(user.notificationToken);

  const [isPwa, setIsPwa] = useState(false);
  const [os, setOS] = useState<string | null>(null);

  useEffect(() => {
    setIsPwa(isPWA());
    setOS(getOS());
  }, []);

  const advertisements: ReactNode[] = [];
  if (!user.classId || !user.email) return;
  if (
    [1, 100, 123].includes(user.classId) ||
    /^[\w.-]+@[\w.-]+\.gopat\.cz$/.test(user.email)
  ) {
    advertisements.push(
      <Advertisement
        header="Koukni na Burzu Opatov"
        actionButtonText="Zaveď mě tam"
        actionButtonRedirect="https://burza.gymnazium-opatov.cz"
        showDownBar={true}
        key={1}
      >
        <ul className="list-disc">
          <li>Nakupuj učebnice levně</li>
          <li>Prodávej své učebnice jednoduše</li>
          <li>Měj vystaráno ještě před prázdninami</li>
        </ul>
      </Advertisement>,
    );
  }

  if (os !== "MacOS")
    advertisements.push(
      <Advertisement
        header="Stáhni si Neoneer"
        actionButtonText="Ukaž mi jak"
        actionButtonRedirect="https://play.google.com/store/apps/details?id=com.Pavee.NeonRush"
        showDownBar={true}
        key={0}
      >
        <ul className="list-disc ml-10">
          <li>
            Neoneer je{" "}
            <p className="font-semibold inline">skvělá mobilní hra</p> na dlouhé
            chvíle
          </li>
          <li>Objevuj propracované úrovně, co se ti mění před očima</li>
          <li>
            <p className="font-semibold inline">
              Podpoříš tím vývojáře Co Píšem
            </p>
          </li>
        </ul>
      </Advertisement>,
    );

  if (!isPwa) {
    return (
      <Advertisement
        header="Stáhni si Co Píšem na plochu"
        actionButtonText="Ukaž mi jak"
        actionButtonRedirect="/settings"
        showDownBar={true}
      >
        <ul className="list-disc">
          <li>
            <p className="font-semibold inline">Nejrychlejší</p> přístup k Co
            Píšem
          </li>
          <li>Nikdy nezapomeneš na úkol či test</li>
          <li>
            Nezabírá to <p className="font-semibold inline">žádné místo</p> na
            tvém zařízení
          </li>
        </ul>
      </Advertisement>
    );
  }
  if (!hasNotifications) {
    return (
      <Advertisement
        header="Aktivuj si oznámení"
        actionButtonText="Ukaž mi jak"
        actionButtonRedirect="/settings"
        showDownBar={true}
      >
        <ul className="list-disc ml-10">
          <li>Nikdy nezapomeneš na úkol či test</li>
          <li>Každý den v 16:00 ti Co Píšem napíše z čeho zítra píšeš</li>
          <li>Zapnout oznámení trvá pouze 2 kliky</li>
        </ul>
      </Advertisement>
    );
  }
  return advertisements[Math.floor(Math.random() * advertisements.length)];
}
