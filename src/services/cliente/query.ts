import { useQuery } from "@tanstack/react-query";
import apiAluno from "./apiCliente";
import {
  GetAlunoRegisteredCoursesStatusProps,
  GetAlunoSelectedCourseDataProps,
} from "./types";

export const useQueryGetAlunoRegisteredCoursesStatus = (
  props: GetAlunoRegisteredCoursesStatusProps
) =>
  useQuery(
    ["useQueryGetAlunoRegisteredCoursesStatus"],
    async () => await apiAluno.getAlunoRegisteredCoursesStatus(props),
    {
      enabled: props && Object.values(props).every((value) => !!value),
    }
  );

export const useQueryGetAlunoCoursesDataList = () =>
  useQuery(
    ["useQueryGetAlunoCoursesDataList"],
    apiAluno.getAlunoCoursesDataList
  );

export const useQueryGetAlunoSelectedCourseData = (
  props: GetAlunoSelectedCourseDataProps
) =>
  useQuery(
    ["useQueryGetAlunoSelectedCourseData"],
    async () => await apiAluno.getAlunoSelectedCourseData(props),
    {
      enabled: !!props.matriculaId,
    }
  );

export const useQueryGetAlunoPaymentsList = () =>
  useQuery(["useQueryGetAlunoPaymentsList"], apiAluno.getAlunoPaymentsList);
