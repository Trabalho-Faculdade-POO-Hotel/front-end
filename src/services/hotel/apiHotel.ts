import { api } from "@/core";
import { AdicionarClienteProps, AdicionarReservaProps, Hotel, ListClientesResponse, ListQuartosDisponiveisResponse } from "./types";

const getHotelData = async () => (await api.get<Hotel>("/hotel"))?.data;

const listClientes = async () => (await api.get<ListClientesResponse>("/hotel/cliente/listar"))?.data;

const adicionarCliente = async ({ cliente }: AdicionarClienteProps) => await api.post("/hotel/cliente/adicionar", cliente);

const listQuartosDisponiveis = async () => (await api.get<ListQuartosDisponiveisResponse>("/hotel/quarto/disponiveis"))?.data;

const adicionarReserva = async ({ reserva }: AdicionarReservaProps) => await api.post("/hotel/reserva/adicionar", reserva);

const apiHotel = {
    getHotelData,
    listClientes,
    adicionarCliente,
    listQuartosDisponiveis,
    adicionarReserva
};

export default apiHotel;