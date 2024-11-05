import { Cliente } from "../cliente/types";

export type ListClientesResponse = Array<Cliente>;

export interface AdicionarClienteProps {
    cliente: Omit<Cliente, "clienteId">;
};