import { api } from "@/core";
import { AtualizarClienteProps, ListarClienteHistoricoReservasProps, ListarClienteHistoricoReservasResponse } from "./types";

const listarClienteHistoricoReservas = async ({ clienteId }: ListarClienteHistoricoReservasProps) => (await api.get<ListarClienteHistoricoReservasResponse>(`/cliente/historico?clienteId=${clienteId}`))?.data;

const atualizarCliente = async ({ cliente }: AtualizarClienteProps) => (await api.put(`/cliente/atualizar`, cliente))?.data;

const apiCliente = {
    listarClienteHistoricoReservas,
    atualizarCliente
};

export default apiCliente;
