import Card from "@/components/Card";
import LanguagesBackgroundImage from "@/assets/languages.jpg";
import Image, { StaticImageData } from "next/image";
import Divider from "@/components/Divider";
import { FaChalkboardTeacher } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface CourseCardProps {
  courseName: string;
  courseStatus: "matriculado" | "desmatriculado";
  courseLevel: "iniciante" | "intermediario" | "avançado";
  teachersList: Array<string>;
  cardBackground?: StaticImageData;
  className?: string;
}
const CourseCard = ({
  courseName,
  courseStatus,
  courseLevel,
  teachersList = [],
  className = "",
  cardBackground = LanguagesBackgroundImage,
}: CourseCardProps) => {
  return (
    <Card
      className={twMerge(
        "flex flex-col p-0 relative overflow-hidden h-[280px] shadow-md group cursor-pointer",
        className
      )}
    >
      <Image
        className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-90 group-hover:scale-110 duration-200 data-[active=false]:grayscale"
        data-active={courseStatus === "matriculado"}
        src={cardBackground}
        alt="background"
      />
      <div className="flex flex-col mt-auto relative bg-white w-full h-[120px] z-50 p-3 group-hover:bg-gray-100 duration-200">
        <div className="relative flex gap-3 items-center">
          <p>{courseName}</p>
          <div
            data-active={courseStatus === "matriculado"}
            className="w-3 h-3 data-[active=true]:bg-green-500 data-[active=false]:bg-red-500 rounded-full ml-auto shrink-0"
          ></div>
          <p>{courseStatus}</p>
        </div>
        <p className="text-gray-400 mb-3">{courseLevel}</p>
        {teachersList?.length > 0 && (
          <>
            <Divider className="grow-0 mt-auto" />
            <div className="flex mt-1 text-gray-400 items-center gap-3 overflow-hidden">
              <FaChalkboardTeacher className="shrink-0" />
              <p className="grow overflow-hidden whitespace-nowrap text-ellipsis">
                {teachersList?.join(", ")}
              </p>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default CourseCard;
