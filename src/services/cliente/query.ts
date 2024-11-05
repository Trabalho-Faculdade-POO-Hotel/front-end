import { useQuery } from "@tanstack/react-query";
import apiCliente from "./apiCliente";
import { ListarClienteHistoricoReservasProps } from "./types";

export const useQueryListarClienteHistoricoReservas = (props: ListarClienteHistoricoReservasProps) => useQuery(
    ["listarClienteHistoricoReservas"],
    async () => await apiCliente.listarClienteHistoricoReservas(props),
    {
        enabled: !!props.clienteId,
    }
);