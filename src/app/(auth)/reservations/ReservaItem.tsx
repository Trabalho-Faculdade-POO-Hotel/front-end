/* eslint-disable react-hooks/rules-of-hooks */
import { useFeedback } from "@/providers/FeedbackProvider";
import { useTooltip } from "@/providers/TooltipProvider";
import { useQueryListarClienteHistoricoReservas } from "@/services/cliente";
import { Quarto } from "@/services/quarto/types";
import apiReserva from "@/services/reserva/apiReserva";
import { Reserva } from "@/services/reserva/types";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { useCallback, useMemo } from "react";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline, IoMdExit } from "react-icons/io";
import { IoTicket } from "react-icons/io5";

interface ReservaItemProps {
    reserva?: Reserva;
    quarto?: Quarto;
    onClickCheckout?: () => void;
}
const ReservaItem = ({ reserva, quarto, onClickCheckout }: ReservaItemProps) => {
    const dataInicial = useMemo(() => moment(reserva?.dataInicio).utcOffset(0).format("DD/MM/YYYY"), [reserva?.dataInicio]);
    const dataFinal = useMemo(() => moment(reserva?.dataFinal).utcOffset(0).format("DD/MM/YYYY"), [reserva?.dataFinal]);

    const feedback = useFeedback();

    const { refetch: refetchReservas } = useQueryListarClienteHistoricoReservas({
        clienteId: reserva?.clienteId
    });

    const { mutate: alterarReservaStatus, isLoading } = useMutation({
        mutationFn: apiReserva.alterarReservaStatus,
        onSuccess: () => {
            refetchReservas();

            feedback({
                message: "Status da reserva alterado com sucesso",
                type: "success"
            });
        },
        onError: () => {
            feedback({
                message: "Erro ao alterar status da reserva",
                type: "error"
            });
        }
    });

    const confirmReserva = useCallback(() => {
        if (reserva) {
            alterarReservaStatus({
                reservaId: reserva?.reservaId,
                status: "ATIVO"
            });	
        }
    }, [alterarReservaStatus, reserva]);

    const cancelReserva = useCallback(() => {
        if (reserva) {
            alterarReservaStatus({
                reservaId: reserva?.reservaId,
                status: "CANCELADO"
            });
        }
    }, [alterarReservaStatus, reserva]);

    return (
        <>
            <div className="flex items-center gap-4 bg-white hover:bg-slate-100 duration-200 bg-opacity-80 px-5 py-2 rounded-md shadow-sm">
                <IoTicket size={30} className="text-primary data-[status=CHECK\_OUT]:text-gray-400 data-[status=PENDENTE]:text-orange-500 data-[status=CANCELADO]:text-red-500" data-status={reserva?.status} />
                <div>
                    <div>{dataInicial} - {dataFinal}</div>
                    <div className="flex">
                        <div>Quarto Nº {quarto?.numero}</div>
                        <p className="mx-1">-</p>
                        <div>{reserva?.status?.replaceAll("_", " ")}</div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div>{quarto?.tipo}</div>
                    <div>{quarto?.lotacao} pessoas</div>
                </div>
                <div className="ml-auto">
                    {quarto?.preco?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </div>
                {reserva?.status === "PENDENTE" && (
                    <div className="flex flex-col justify-evenly items-center h-full data-[isloading=true]:grayscale data-[isloading=true]:animate-pulse data-[isloading=true]:pointer-events-none" data-isloading={isLoading}>
                        <IoMdCheckmarkCircleOutline className="text-green-500 cursor-pointer hover:scale-150 duration-200" size={20} onClick={confirmReserva} {...useTooltip("Confirmar Reserva")} />
                        <IoMdCloseCircleOutline className="text-red-500 cursor-pointer hover:scale-150 duration-200" size={20} onClick={cancelReserva} {...useTooltip("Cancelar Reserva")} />
                    </div>
                )}
                {reserva?.status === "ATIVO" && (
                    <div className="flex flex-col justify-evenly items-center h-full data-[isloading=true]:grayscale data-[isloading=true]:animate-pulse data-[isloading=true]:pointer-events-none" data-isloading={isLoading}>
                        <IoMdExit className="text-red-400 cursor-pointer hover:scale-150 duration-200" size={20} onClick={onClickCheckout} {...useTooltip("Realizar Check Out")} />
                    </div>
                )}
            </div>
        </>
    );
}

export default ReservaItem;
