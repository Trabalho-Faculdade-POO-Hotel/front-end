import Card from "@/components/Card";
import ProgressCircle from "@/components/ProgressCircle";
import StarProgress from "@/components/StarProgress";
import { useQueryGetAlunoRegisteredCoursesStatus } from "@/services/aluno";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface CoursesStatusCardProps {
  className?: string;
}
const CoursesStatusCard = ({ className }: CoursesStatusCardProps) => {
  const router = useRouter();

  const actualMonthData = useMemo(() => {
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getUTCMonth() + 1;
    const nowMonthName = nowDate.toLocaleString("default", {
      month: "long",
    });

    return {
      year: nowYear,
      month: nowMonth,
      monthName: nowMonthName,
    };
  }, []);

  const {
    data: registeredCoursesStatus,
    isLoading: isRegisteredCoursesStatusLoading,
  } = useQueryGetAlunoRegisteredCoursesStatus({
    year: actualMonthData?.year,
    month: actualMonthData?.month,
  });

  const openCourse = useCallback(
    (matriculaId: number) => {
      router.push(`/student/courses/${matriculaId}`);
    },
    [router]
  );

  const coursesStatusViews = useMemo(() => {
    if (registeredCoursesStatus?.length === 0) {
      return (
        <p className="text-gray-400">Dados indisponíveis para o mês atual</p>
      );
    }

    return registeredCoursesStatus?.map((registeredCourseStatusData, i) => {
      const cursoNome = registeredCourseStatusData?.curso?.cursoNome;
      const cursoNivel = registeredCourseStatusData?.curso?.cursoNivel;
      const media = registeredCourseStatusData?.media;
      const mediaProporcao = media / 5.0;

      return (
        <>
          <div
            key={i}
            onClick={() => openCourse(registeredCourseStatusData?.matriculaId)}
            className="flex items-center border-2 p-3 rounded-lg hover:bg-gray-500 hover:bg-opacity-5 cursor-pointer duration-100"
          >
            <div className="flex flex-col">
              <p className="text-xl">{cursoNome}</p>
              <p className="text-gray-500">{cursoNivel}</p>
            </div>
            <p className="flex justify-center items-center ml-auto mr-5 text-xl">
              {media?.toFixed?.(1)} / 5.0
            </p>
            <StarProgress progress={mediaProporcao * 100} size={40} />
            {/* <ProgressCircle size={"60px"} percentage={mediaProporcao * 100} /> */}
          </div>
        </>
      );
    });
  }, [openCourse, registeredCoursesStatus]);

  return (
    <Card
      className={twMerge(
        "flex flex-col gap-5 overflow-y-auto select-none",
        className
      )}
    >
      <p className="text-2xl">
        Seu progresso do mês de{" "}
        <span className="!capitalize">{actualMonthData?.monthName}</span>:
      </p>
      {isRegisteredCoursesStatusLoading ? (
        <Skeleton height={"60px"} />
      ) : (
        coursesStatusViews
      )}
      <p className="text-gray-400">Exibindo apenas matrículas ativas</p>
    </Card>
  );
};

export default CoursesStatusCard;
