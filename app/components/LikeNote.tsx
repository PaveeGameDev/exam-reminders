"use client";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

// type Props = {
//   onClick: () => void;
// };

export default function LikeNote() {
  const [active, setActive] = useState(false);

  const toggle = () => {
    setActive(!active);
    // onClick();
  };

  if (active) return <AiFillHeart onClick={toggle} color="pink" size={20} />;

  return <AiOutlineHeart onClick={toggle} size={20} />;
}
