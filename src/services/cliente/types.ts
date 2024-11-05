import { Reserva } from "../reserva/types";

export interface Cliente {
    clienteId: number;
    nome: string;
    email: string;
    dataNascimento: string;
    telefone: string;
    endereco: string;
}

export interface ListarClienteHistoricoReservasProps {
    clienteId?: number;
}
export type ListarClienteHistoricoReservasResponse = Array<Reserva>;

export interface AtualizarClienteProps {
    cliente: Cliente;
}