import { FaRegPenToSquare, FaTriangleExclamation } from "react-icons/fa6";
import { MdOutlineTaskAlt } from "react-icons/md";

type Props = {
  examType: number;
};
export default function ExamIcon({ examType }: Props) {
  switch (examType) {
    case 1:
      return (
        <div className="w-[40px] mr-3">
          <MdOutlineTaskAlt style={{ color: "#FFC836" }} size={40} />
        </div>
      );
    case 2:
      return (
        <div className="w-[40px] mr-3">
          <FaRegPenToSquare style={{ color: "#FFC836" }} size={40} />
        </div>
      );

    case 3:
    case 4:
      return (
        <div className="w-[40px] mr-3">
          <FaTriangleExclamation style={{ color: "#FFC836" }} size={40} />
        </div>
      );
  }
}
