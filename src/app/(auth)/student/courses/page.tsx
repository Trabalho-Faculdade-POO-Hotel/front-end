"use client";

import { useQueryGetAlunoCoursesDataList } from "@/services/aluno";
import CourseCard from "./CourseCard";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

const CoursesPage = () => {
  const router = useRouter();
  const coursesList = useQueryGetAlunoCoursesDataList();

  const openCourse = useCallback(
    (matriculaId: number) => {
      router.push(`/student/courses/${matriculaId}`);
    },
    [router]
  );

  const coursesCardElements = useMemo(
    () =>
      coursesList?.data?.map((courseData, i) => (
        <div
          key={i}
          onClick={() => openCourse(courseData.matricula.matriculaId)}
        >
          <CourseCard
            courseName={courseData?.curso?.cursoNome}
            courseLevel={courseData?.curso?.cursoNivel}
            courseStatus={
              courseData?.matricula?.matriculaStatus === "ativa"
                ? "matriculado"
                : "desmatriculado"
            }
            teachersList={courseData?.professores?.map(
              (professorData) => professorData?.professorNome
            )}
          />
        </div>
      )),
    [coursesList?.data, openCourse]
  );

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto pb-10">
      <div className="w-[80%] overflow-hidden grid grid-cols-1 min-[870px]:grid-cols-2 xl:grid-cols-3 m-10 mx-auto gap-3">
        {coursesCardElements}
      </div>
    </div>
  );
};

export default CoursesPage;
