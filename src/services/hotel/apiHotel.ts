import { api } from "@/core";
import { ListClientesResponse } from "./types";

const listClientes = async () => await api.get<ListClientesResponse>("/hotel/cliente/listar");

const apiHotel = {
    listClientes
};

export default apiHotel;