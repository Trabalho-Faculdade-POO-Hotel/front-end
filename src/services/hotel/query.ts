import { useQuery } from "@tanstack/react-query";
import apiHotel from "./apiHotel";

export const useQueryGetHotelData = () => useQuery(
    ["useQueryGetHotelData"],
    async () => await apiHotel.getHotelData()
);

export const useQueryListClientes = () => useQuery(
    ["useQueryListClientes"],
    async () => await apiHotel.listClientes()
);

export const useQueryListQuartosDisponiveis = () => useQuery(
    ["useQueryListQuartosDisponiveis"],
    async () => await apiHotel.listQuartosDisponiveis()
);
