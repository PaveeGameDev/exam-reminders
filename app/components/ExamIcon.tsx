import { FaRegPenToSquare, FaTriangleExclamation } from "react-icons/fa6";
import { MdOutlineTaskAlt } from "react-icons/md";
import { RiUserVoiceFill } from "react-icons/ri";

type Props = {
  examType: number;
};
export default function ExamIcon({ examType }: Props) {
  let content = null;

  switch (examType) {
    case 1:
      content = <MdOutlineTaskAlt style={{ color: "#FFC836" }} size={40} />;
      break;
    case 2:
      content = <FaRegPenToSquare style={{ color: "#FFC836" }} size={40} />;
      break;
    case 3:
      content = (
        <FaTriangleExclamation style={{ color: "#FFC836" }} size={40} />
      );
      break;
    case 4:
      content = <RiUserVoiceFill style={{ color: "#FFC836" }} size={40} />;
  }
  return <div className="w-[40px] mr-3">{content}</div>;
}
