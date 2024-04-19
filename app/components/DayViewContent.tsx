"use client";

import { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
};

export default function DayViewContent({ children }: Props) {
  const childrenRef = useRef<HTMLDivElement>(null);
  const hrRef = useRef<HTMLHRElement>(null);

  useEffect(() => {
    if (
      childrenRef.current &&
      hrRef.current &&
      childrenRef.current.offsetHeight > 0
    ) {
      hrRef.current.style.height = `${childrenRef.current.offsetHeight}px`;
    }
  }, [childrenRef.current]);

  return (
    <>
      <hr
        ref={hrRef}
        className="w-0.5 min-w-0.5 bg-primary border-primary h-[100px]"
      />
      <div ref={childrenRef} className="w-full h-full">
        {children}
      </div>
    </>
  );
}
