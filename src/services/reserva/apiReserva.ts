import { api } from "@/core";
import { AlterarReservaQuartoProps, AlterarReservaStatusProps } from "./types";

const alterarReservaStatus = async (props: AlterarReservaStatusProps) => (await api.put("/reserva/alterar/status", props))?.data;

const alterarReservaQuarto = async (props: AlterarReservaQuartoProps) => (await api.put("/reserva/alterar/quarto", props))?.data;

const apiReserva = {
    alterarReservaStatus,
    alterarReservaQuarto
};

export default apiReserva;
