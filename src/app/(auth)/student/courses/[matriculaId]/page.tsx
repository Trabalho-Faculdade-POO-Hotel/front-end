"use client";

import Card from "@/components/Card";
import Divider from "@/components/Divider";
import { useTooltip } from "@/providers/TooltipProvider";
import { Skeleton, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaChalkboardTeacher, FaRegCalendar } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import ExamsList from "./ExamsList";
import { useQueryGetAlunoSelectedCourseData } from "@/services/aluno";
import { convertDateToString } from "@/core/utils";
import PaymentsList from "./PaymentsList";
import { PiExamFill } from "react-icons/pi";
import TeachersList from "./TeachersList";
import LessonsList from "./LessonsList";

const SelectedCoursePage = ({
  params,
}: {
  params: { matriculaId: number };
}) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const router = useRouter();

  const selectedMatriculaId = useMemo(
    () => Number(params?.matriculaId),
    [params?.matriculaId]
  );

  const { data: selectedCourseData, isLoading: isSelectedCourseDataLoading } =
    useQueryGetAlunoSelectedCourseData({
      matriculaId: selectedMatriculaId,
    });

  useEffect(() => {
    if (Number.isNaN(selectedMatriculaId)) {
      router.push("/student/courses");
    }
  }, [router, selectedMatriculaId]);

  const optionsElements = useMemo(
    () => [
      <ExamsList
        key={0}
        examsList={
          selectedCourseData?.avaliacoes?.map((avaliacao) => ({
            avaliacaoNota: avaliacao.avaliacaoNota,
            avaliacaoDescricao: avaliacao.avaliacaoDescricao,
            avaliacaoData: avaliacao.avaliacaoData,
          })) || []
        }
      />,
      <LessonsList
        key={1}
        lessonsList={
          selectedCourseData?.aulas?.map((aula) => ({
            aulaData: aula.aulaData,
            aulaLocal: aula.aulaLocal,
            aulaStatus: aula.aulaStatus,
            professorNome: aula.professor.professorNome,
          })) || []
        }
      />,
      <PaymentsList
        key={2}
        paymentsList={
          selectedCourseData?.pagamentos?.map((pagamento) => ({
            pagamentoValor: pagamento.pagamentoValor,
            pagamentoMetodo: pagamento.pagamentoMetodo,
            pagamentoStatus: pagamento.pagamentoStatus,
            pagamentoData: pagamento.pagamentoData,
          })) || []
        }
      />,
      <TeachersList
        key={3}
        teachersList={
          selectedCourseData?.professores?.map((professor) => ({
            professorNome: professor.professorNome,
            professorEmail: professor.professorEmail,
          })) || []
        }
      />,
    ],
    [
      selectedCourseData?.aulas,
      selectedCourseData?.avaliacoes,
      selectedCourseData?.pagamentos,
      selectedCourseData?.professores,
    ]
  );

  return (
    <div className="flex flex-col w-full h-full items-center py-10 gap-3 overflow-y-auto">
      <Card className="flex flex-col w-[50%] gap-1">
        {isSelectedCourseDataLoading ? (
          <>
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </>
        ) : (
          <>
            <div className="flex items-center">
              <p>{selectedCourseData?.curso?.cursoNome}</p>
              <p className="mx-2">-</p>
              <p className="mr-auto">
                {selectedCourseData?.idioma?.idiomaNome}
              </p>
              <div
                data-isactive={
                  selectedCourseData?.matricula?.matriculaStatus === "ativa"
                }
                className="w-3 h-3 rounded-full shrink-0 grow-0 bg-red-500 data-[isactive=true]:bg-green-500"
              ></div>
              <p className="ml-3">
                Matrícula {selectedCourseData?.matricula?.matriculaStatus}
              </p>
            </div>
            <div className="flex text-gray-400 gap-3">
              <p>{selectedCourseData?.curso?.cursoNivel}</p>
              <p className="ml-auto">
                Matriculado desde{" "}
                {convertDateToString(
                  new Date(selectedCourseData?.matricula?.matriculaData || "")
                )}
              </p>
            </div>
          </>
        )}
      </Card>
      <Card className="w-[50%]">
        {isSelectedCourseDataLoading && <Skeleton className="h-14 !m-0" />}
        <Tabs
          data-isloading={isSelectedCourseDataLoading}
          className="data-[isloading=true]:hidden"
          value={selectedOption}
          onChange={(_, value) => setSelectedOption(value)}
        >
          <Tab
            className="!rounded-md overflow-hidden !mb-1"
            icon={<PiExamFill className="pointer-events-none" size={"25px"} />}
            {...useTooltip("Avaliações")}
          />
          <Tab
            className="!rounded-md overflow-hidden !mb-1"
            icon={
              <FaRegCalendar className="pointer-events-none" size={"25px"} />
            }
            {...useTooltip("Aulas")}
          />
          <Tab
            className="!rounded-md overflow-hidden !mb-1"
            icon={<MdPayments className="pointer-events-none" size={"25px"} />}
            {...useTooltip("Pagamentos")}
          />
          <Tab
            className="!rounded-md overflow-hidden !mb-1"
            icon={
              <FaChalkboardTeacher
                className="pointer-events-none"
                size={"25px"}
              />
            }
            {...useTooltip("Professores")}
          />
        </Tabs>
        <Divider className="my-3" />
        <div>
          {isSelectedCourseDataLoading ? (
            <Skeleton className="h-20" />
          ) : (
            optionsElements?.[selectedOption]
          )}
        </div>
      </Card>
    </div>
  );
};

export default SelectedCoursePage;
