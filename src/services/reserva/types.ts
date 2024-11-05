export interface Reserva {
    reservaId: number;
    dataInicio: string;
    dataFinal: string;
    status: "ATIVO" | "PENDENTE" | "CANCELADO" | "NO_SHOW" | "CHECK_IN" | "CHECK_OUT";
    clienteId: number;
    quartoId: number;
}

export interface AlterarReservaStatusProps {
    reservaId: Reserva["reservaId"];
    status: Reserva["status"];
}

export interface AlterarReservaQuartoProps {
    reservaId: Reserva["reservaId"];
    quartoId: Reserva["quartoId"];
}