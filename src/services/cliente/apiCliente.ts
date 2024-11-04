import { api } from "@/core";
import {
  GetAlunoCoursesDataListResponse,
  GetAlunoPaymentsListResponse,
  GetAlunoRegisteredCoursesStatusProps,
  GetAlunoRegisteredCoursesStatusResponse,
  GetAlunoSelectedCourseDataProps,
  GetAlunoSelectedCourseDataResponse,
  UpdateAlunoDataProps,
} from "./types";

const getAlunoRegisteredCoursesStatus = async ({
  year,
  month,
}: GetAlunoRegisteredCoursesStatusProps) =>
  (
    await api.get<GetAlunoRegisteredCoursesStatusResponse>(
      "/api/aluno/notas/desempenho",
      {
        params: {
          year,
          month,
        },
      }
    )
  )?.data;

const getAlunoCoursesDataList = async () =>
  (await api.get<GetAlunoCoursesDataListResponse>("/api/aluno/cursos/list"))
    ?.data;

const getAlunoSelectedCourseData = async ({
  matriculaId,
}: GetAlunoSelectedCourseDataProps) =>
  (
    await api.get<GetAlunoSelectedCourseDataResponse>(
      `/api/aluno/cursos/${matriculaId}`
    )
  )?.data;

const getAlunoPaymentsList = async () =>
  (await api.get<GetAlunoPaymentsListResponse>("/api/aluno/pagamentos/list"))
    ?.data;

const updateAlunoData = async (data: UpdateAlunoDataProps) =>
  await api.put("/api/aluno/update", data);

const apiAluno = {
  getAlunoRegisteredCoursesStatus,
  getAlunoCoursesDataList,
  getAlunoSelectedCourseData,
  getAlunoPaymentsList,
  updateAlunoData,
};

export default apiAluno;
