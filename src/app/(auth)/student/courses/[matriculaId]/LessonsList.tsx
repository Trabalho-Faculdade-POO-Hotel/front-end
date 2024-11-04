import Divider from "@/components/Divider";
import { convertDateToString } from "@/core/utils";
import { useMemo } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface LessonsListProps {
  className?: string;
  lessonsList: Array<{
    aulaData: string;
    aulaLocal: string;
    aulaStatus: "programada" | "realizada" | "cancelada";
    professorNome: string;
  }>;
}
export const LessonsList = ({ className, lessonsList }: LessonsListProps) => {
  const lessonsElements = useMemo(
    () =>
      lessonsList.map((lesson, i) => (
        <div
          className="flex flex-col justify-start border-2 rounded-md p-3 select-none"
          key={i}
        >
          <div className="relative flex items-center gap-1">
            <p className="text-lg text-start">
              {convertDateToString(new Date(lesson.aulaData))}
            </p>
            <p className="text-gray-400">-</p>
            <p className="text-gray-400 text-sm">{lesson.aulaLocal}</p>
            <div className="ml-auto flex justify-center items-center">
              <p className="text-gray-400 text-sm">{lesson.aulaStatus}</p>
            </div>
            <div
              data-lessonstatus={lesson.aulaStatus}
              className="ml-2 w-3 h-3 shrink-0 grow-0 data-[lessonstatus=realizada]:bg-green-500 data-[lessonstatus=programada]:bg-blue-500 data-[lessonstatus=cancelada]:bg-red-500 rounded-full"
            ></div>
          </div>
          <div className="flex mt-1 text-gray-400 items-center gap-3 overflow-hidden">
            <FaChalkboardTeacher className="shrink-0" />
            <p className="grow overflow-hidden whitespace-nowrap text-ellipsis">
              {lesson.professorNome}
            </p>
          </div>
        </div>
      )),
    [lessonsList]
  );

  return (
    <div className={twMerge("flex flex-col gap-3", className)}>
      {lessonsElements.length > 0 ? (
        lessonsElements
      ) : (
        <p className="text-gray-400">Não há aulas cadastradas</p>
      )}
    </div>
  );
};

export default LessonsList;
