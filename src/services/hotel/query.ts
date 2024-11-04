import { useQuery } from "@tanstack/react-query";
import apiHotel from "./apiHotel";

export const useQueryListClientes = () => useQuery(
    ["useQueryListClientes"],
    async () => await apiHotel.listClientes()
);
