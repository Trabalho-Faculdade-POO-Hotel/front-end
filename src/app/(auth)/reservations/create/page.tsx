"use client";

import Card from "@/components/Card";
import Divider from "@/components/Divider";
import { authorization } from "@/core";
import { useFeedback } from "@/providers/FeedbackProvider";
import { useQueryListClientes, useQueryListQuartosDisponiveis } from "@/services/hotel";
import apiHotel from "@/services/hotel/apiHotel";
import { AdicionarReservaProps } from "@/services/hotel/types";
import { Quarto } from "@/services/quarto/types";
import { Skeleton } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Moment } from "moment";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import ConfimationModal from "./ConfirmationModal";
import QuartoItem from "./QuartoItem";

const CreateReservationPage = () => {
    const [selectedQuarto, setSelectedQuarto] = useState<Quarto | null>(null);

    const { data: quartosDisponiveis, isLoading: isListQuartosDisponiveisLoading } = useQueryListQuartosDisponiveis();
    
    const { data: clientesList } = useQueryListClientes();
    const feedback = useFeedback();
    const router = useRouter();

    const { mutate: adicionarReserva, isLoading: isAdicionarReservaLoading } = useMutation(apiHotel.adicionarReserva, {
        onSuccess: () => {
          feedback({
            message: "Reserva realizada com sucesso!",
            type: "success",
          });
          router.push("/reservations");
        },
        onError: () => {
          feedback({
            message: "Erro ao realizar reserva.",
            type: "error",
          });
        },
      });
    
      const onConfirmCallback = useCallback(
        (initialDate: Moment, finalDate: Moment) => {
          const clienteEmail = authorization.getAccessToken();
          if (!clienteEmail || !clientesList || !selectedQuarto) {
            feedback({
              message: "Erro: dados insuficientes para realizar a reserva.",
              type: "error",
            });
            return;
          }
    
          const cliente = clientesList.find((cliente) => cliente.email === clienteEmail);
          if (!cliente) {
            feedback({
              message: "Cliente não encontrado.",
              type: "error",
            });
            return;
          }
    
          const props: AdicionarReservaProps = {
            reserva: {
                dataInicio: initialDate.format("YYYY-MM-DD"),
                dataFinal: finalDate.format("YYYY-MM-DD"),
                status: "PENDENTE",
                clienteId: cliente.clienteId,
                quartoId: selectedQuarto.quartoId,
            }
          };
    
          adicionarReserva(props);
        },
        [clientesList, selectedQuarto, adicionarReserva, feedback]
      );

    const filteredQuartosList = useMemo(() => quartosDisponiveis?.sort((a, b) => a.numero - b.numero)?.map((quarto, i) => <QuartoItem key={i} quarto={quarto} onClick={() => setSelectedQuarto(quarto)} />), [quartosDisponiveis]);

    return (
        <div className="w-full grow flex flex-col justify-center items-center">
            <Card className="relative flex flex-col h-[70vh]">
                <div className="w-[800px] flex flex-col items-start">
                    <p className="text-lg">Quartos disponíveis</p>
                </div>
                <Divider className="grow-0 mt-3" />
                <div className="flex flex-col gap-3 py-3 overflow-y-auto overflow-x-hidden px-3">
                    {isListQuartosDisponiveisLoading ? (
                        <>
                            <Skeleton className="h-[70px]" />
                            <Skeleton className="h-[70px]" />
                            <Skeleton className="h-[70px]" />
                        </>
                    ) : (
                        filteredQuartosList
                    )}

                    {quartosDisponiveis?.length === 0 && <div className="grow select-none">Nenhum quarto disponível</div>}
                </div>
                <Divider className="grow-0 mt-auto" />
            </Card>
            <ConfimationModal 
                open={!!selectedQuarto} 
                selectedQuarto={selectedQuarto} 
                isLoading={isAdicionarReservaLoading}
                onClose={() => setSelectedQuarto(null)} 
                onConfirm={onConfirmCallback}
            />
        </div>
    );
}

export default CreateReservationPage;
