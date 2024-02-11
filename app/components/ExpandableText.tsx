"use client";
import { useState } from "react";

type Props = {
  children: string;
  length?: number;
  showLess?: boolean;
};

export const ExpandableText = ({
  children,
  length = 100,
  showLess = true,
}: Props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleSum = () => {
    setExpanded(!expanded);
  };
  if (children.length <= length) return <p>{children}</p>;
  const text = expanded ? children : children.substring(0, length);

  return (
    <p className="my-2">
      {text}
      {!expanded ? "..." : ""}
      {showLess && (
        <button
          className="btn btn-secondary btn-outline ml-3 py-0.5"
          onClick={toggleSum}
        >
          {expanded ? "less" : "more"}
        </button>
      )}
      {!showLess && !expanded && (
        <button
          className="btn btn-secondary btn-outline ml-3 py-0.5"
          onClick={toggleSum}
        >
          {expanded ? "less" : "more"}
        </button>
      )}
    </p>
  );
};
