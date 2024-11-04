"use client";

import Card from "@/components/Card";
import { convertDateToString, convertNumberToMoneyFormat } from "@/core/utils";
import { useQueryGetAlunoPaymentsList } from "@/services/aluno";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { FaCreditCard, FaMoneyCheckAlt } from "react-icons/fa";

const PaymentsPage = () => {
  const router = useRouter();
  const { data: paymentsList, isLoading: isPaymentsListLoading } =
    useQueryGetAlunoPaymentsList();

  const openCourseData = useCallback(
    (matriculaId: number) => {
      router.push(`/student/courses/${matriculaId}`);
    },
    [router]
  );

  const paymentsListElements = useMemo(
    () =>
      paymentsList?.map((payment, i) => (
        <div
          key={i}
          className="flex justify-center items-center border-2 rounded-md p-3 select-none hover:bg-gray-100 duration-100 cursor-pointer"
          onClick={() => openCourseData(payment.matricula.matriculaId)}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <p className="text-lg">Mensalidade</p>
              <p>-</p>
              <p>{payment.curso.cursoNome}</p>
            </div>
            {payment.pagamentoStatus === "atrasado" ||
            payment.pagamentoStatus === "pendente" ? (
              <p className="text-gray-400 text-sm">
                Vencimento em{" "}
                {convertDateToString(new Date(payment.pagamentoData))}
              </p>
            ) : (
              <div className="flex text-gray-400 items-center gap-2">
                {payment.pagamentoMetodo === "boleto" ? (
                  <FaMoneyCheckAlt size={"20px"} />
                ) : (
                  <FaCreditCard size={"20px"} />
                )}
                <p className="text-sm">{payment.pagamentoMetodo}</p>
              </div>
            )}
          </div>
          <div className="ml-auto flex justify-center items-center">
            <p>{convertNumberToMoneyFormat(payment.pagamentoValor)}</p>
            <p className="mx-3 text-gray-400">|</p>
            <p className="text-gray-400 text-sm">{payment.pagamentoStatus}</p>
          </div>
          <div
            data-paymentstatus={payment.pagamentoStatus}
            className="ml-5 w-3 h-3 shrink-0 grow-0 data-[paymentstatus=pago]:bg-green-500 data-[paymentstatus=pendente]:bg-yellow-500 data-[paymentstatus=atrasado]:bg-red-500 rounded-full"
          ></div>
        </div>
      )) || [],
    [openCourseData, paymentsList]
  );

  return (
    <div className="flex flex-col w-full h-full py-10 items-center gap-3">
      <Card className="w-[50%]">Demonstrativo Financeiro</Card>
      <Card className="flex flex-col w-[50%] gap-3">
        {isPaymentsListLoading ? (
          <>
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </>
        ) : paymentsListElements.length > 0 ? (
          paymentsListElements
        ) : (
          <p className="text-gray-400">Não há pagamentos registrados</p>
        )}
      </Card>
    </div>
  );
};

export default PaymentsPage;
