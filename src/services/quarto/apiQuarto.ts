import { api } from "@/core";
import { ListQuartoResponse } from "./types";

const listQuarto = async () => (await api.get<ListQuartoResponse>("/quarto/listar"))?.data;

const apiQuarto = {
    listQuarto
};

export default apiQuarto;
