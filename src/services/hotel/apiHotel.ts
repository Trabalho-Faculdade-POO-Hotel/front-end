import { api } from "@/core";
import { AdicionarClienteProps, ListClientesResponse } from "./types";

const listClientes = async () => await api.get<ListClientesResponse>("/hotel/cliente/listar");

const adicionarCliente = async ({ cliente }: AdicionarClienteProps) => await api.post("/hotel/cliente/adicionar", cliente);

const apiHotel = {
    listClientes,
    adicionarCliente
};

export default apiHotel;