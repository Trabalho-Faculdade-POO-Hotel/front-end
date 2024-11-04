import { useMemo } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface TeachersListProps {
  className?: string;
  teachersList: Array<{
    professorNome: string;
    professorEmail: string;
  }>;
}
const TeachersList = ({ className, teachersList }: TeachersListProps) => {
  const teachersElements = useMemo(
    () =>
      teachersList.map((teacher, i) => (
        <div
          className="flex items-center border-2 rounded-md p-3 select-none"
          key={i}
        >
          <div className="w-14 h-14 bg-white text-blue-500 flex justify-center items-center rounded-full mr-5">
            <FaChalkboardTeacher size={"30px"} />
          </div>
          <div className="flex flex-col">
            <p className="text-lg text-start">{teacher.professorNome}</p>
            <p className="text-gray-400 text-sm">{teacher.professorEmail}</p>
          </div>
        </div>
      )),
    [teachersList]
  );

  return (
    <div className={twMerge("flex flex-col gap-3", className)}>
      {teachersElements.length > 0 ? (
        teachersElements
      ) : (
        <p className="text-gray-400">Não há professores cadastrados</p>
      )}
    </div>
  );
};

export default TeachersList;
