import { convertDateToString, convertNumberToMoneyFormat } from "@/core/utils";
import { useMemo } from "react";
import { FaCreditCard, FaMoneyCheckAlt } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface PaymentsListProps {
  className?: string;
  paymentsList: Array<{
    pagamentoValor: number;
    pagamentoData: string;
    pagamentoMetodo: "crédito" | "débito" | "boleto";
    pagamentoStatus: "pendente" | "pago" | "atrasado";
  }>;
}
const PaymentsList = ({ className, paymentsList }: PaymentsListProps) => {
  const paymentsElements = useMemo(
    () =>
      paymentsList.map((payment, i) => (
        <div
          className="flex justify-center items-center border-2 rounded-md p-3 select-none"
          key={i}
        >
          <div className="flex flex-col">
            <p className="text-lg">Mensalidade</p>
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
      )),
    [paymentsList]
  );

  return (
    <div className={twMerge("flex flex-col gap-3", className)}>
      {paymentsElements.length > 0 ? (
        paymentsElements
      ) : (
        <p className="text-gray-400">Não há pagamentos registrados</p>
      )}
    </div>
  );
};

export default PaymentsList;
