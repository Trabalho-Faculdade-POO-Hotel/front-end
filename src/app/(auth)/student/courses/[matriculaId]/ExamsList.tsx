import { convertDateToString } from "@/core/utils";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface ExamsListProps {
  className?: string;
  examsList: Array<{
    avaliacaoDescricao: string;
    avaliacaoNota: number;
    avaliacaoData: string;
  }>;
}
const ExamsList = ({ examsList, className }: ExamsListProps) => {
  const examsElementsList = useMemo(
    () =>
      examsList.map((examData, i) => (
        <div
          className="flex justify-center items-center border-2 rounded-md p-3 select-none"
          key={i}
        >
          <div className="flex flex-col">
            <p className="text-lg">{examData?.avaliacaoDescricao}</p>
            <p className="text-gray-400 text-sm">
              Realizada em{" "}
              {convertDateToString(new Date(examData?.avaliacaoData))}
            </p>
          </div>
          <div className="ml-auto flex justify-center items-center">
            {examData?.avaliacaoNota?.toFixed?.(1)} / 5.0
          </div>
        </div>
      )),
    [examsList]
  );

  return (
    <div className={twMerge("flex flex-col gap-3", className)}>
      {examsElementsList?.length > 0 ? (
        examsElementsList
      ) : (
        <p className="text-gray-400 select-none">Sem avaliações cadastradas</p>
      )}
    </div>
  );
};

export default ExamsList;
