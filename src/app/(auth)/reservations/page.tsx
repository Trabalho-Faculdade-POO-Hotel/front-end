"use client";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Divider from "@/components/Divider";
import { authorization } from "@/core";
import { useQueryListarClienteHistoricoReservas } from "@/services/cliente";
import { useQueryListClientes } from "@/services/hotel";
import { useQueryListQuarto } from "@/services/quarto";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import ReservaItem from "./ReservaItem";
import CheckoutConfirmationModal from "./CheckoutConfirmationModal";
import { Reserva } from "@/services/reserva/types";
import { useMutation } from "@tanstack/react-query";
import apiReserva from "@/services/reserva/apiReserva";
import { useFeedback } from "@/providers/FeedbackProvider";

const ReservationsPage = () => {
    const [selectedCheckoutReserva, setSelectedCheckoutReserva] = useState<Reserva | null>(null);

    const router = useRouter();
    const feedback = useFeedback();

    
    const { data: clientesList } = useQueryListClientes();
    const currentUserClienteId = useMemo(() => clientesList?.find((c) => c.email === authorization.getAccessToken())?.clienteId, [clientesList]);
    
    const { data: historicoReservas, isLoading: isHistoricoReservasLoading, refetch: refetchReservas } = useQueryListarClienteHistoricoReservas({ clienteId: currentUserClienteId });
    const { data: quartoList } = useQueryListQuarto();
    
    const goToCreateReservationPage = useCallback(() => {
        router.push("/reservations/create");
    }, [router]);
    
    const { mutate: alterarReservaStatus, isLoading: isAlterarReservaStatusLoading } = useMutation({
        mutationFn: apiReserva.alterarReservaStatus,
        onSuccess: () => {
            refetchReservas();

            setSelectedCheckoutReserva(null);

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

    const alterarReservaStatusCallback = useCallback(() => {
        if (selectedCheckoutReserva) {
            alterarReservaStatus({
                reservaId: selectedCheckoutReserva?.reservaId,
                status: "CHECK_OUT"
            });
        }
    }, [alterarReservaStatus, selectedCheckoutReserva]);

    const historicoReservasReversed = useMemo(() => historicoReservas?.slice().reverse(), [historicoReservas]);

    return (
        <div className="w-full grow flex flex-col justify-center items-center">
            <Card className="relative flex flex-col min-h-[288px]">
                <div className="w-[600px] flex items-center">
                    <p className="text-xl">Minhas reservas:</p>
                    <Button className="ml-auto" onClick={goToCreateReservationPage}>Realizar Reserva</Button>
                </div>
                <Divider className="grow-0 mt-3" />
                {historicoReservas?.length === 0 && <div className="grow">Você não possui reservas</div>}
                <div className="flex flex-col w-full h-[50vh] overflow-y-auto gap-3 py-3 px-3">
                    {isHistoricoReservasLoading && 
                        <>
                            <Skeleton className="!h-[80px] shrink-0" />
                            <Skeleton className="!h-[80px] shrink-0" />
                            <Skeleton className="!h-[80px] shrink-0" />
                            <Skeleton className="!h-[80px] shrink-0" />
                        </>
                    }
                    {historicoReservasReversed?.map((reserva) => (
                        <ReservaItem
                            key={reserva.reservaId} 
                            reserva={reserva} 
                            quarto={quartoList?.find((quarto) => quarto.quartoId === reserva.quartoId)}
                            onClickCheckout={() => setSelectedCheckoutReserva(reserva)}
                        />
                    ))}
                </div>
                <Divider className="grow-0" />
            </Card>

            <CheckoutConfirmationModal
                open={!!selectedCheckoutReserva}
                isLoading={isAlterarReservaStatusLoading}
                onConfirm={alterarReservaStatusCallback}
                onClose={() => setSelectedCheckoutReserva(null)}
            />
        </div>
    );
}

export default ReservationsPage;
