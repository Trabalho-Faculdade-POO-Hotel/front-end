import { useQuery } from "@tanstack/react-query";
import apiQuarto from "./apiQuarto";

export const useQueryListQuarto = () => useQuery(
    ["useQueryListQuarto"],
    async () => await apiQuarto.listQuarto()
);