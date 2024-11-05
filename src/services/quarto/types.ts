export interface Quarto {
    quartoId: number;
    numero: number;
    tipo: "SUITE" | "QUARTO_INDIVIDUAL" | "QUARTO_FAMILIAR" | "QUARTO_EXECUTIVO";
    lotacao: number;
    preco: number;
    emManutencao: boolean;
    hotelId: number;
}

export type ListQuartoResponse = Array<Quarto>;
