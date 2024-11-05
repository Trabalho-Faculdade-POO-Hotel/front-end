import { Cliente } from "../cliente/types";
import { Quarto } from "../quarto/types";
import { Reserva } from "../reserva/types";

export interface Hotel {
    hotelId: number;
    nome: string;
    endereco: string;
};

export type ListClientesResponse = Array<Cliente>;

export interface AdicionarClienteProps {
    cliente: Omit<Cliente, "clienteId">;
};

export type ListQuartosDisponiveisResponse = Array<Quarto>;

export interface AdicionarReservaProps {
    reserva: Omit<Reserva, "reservaId">;
};