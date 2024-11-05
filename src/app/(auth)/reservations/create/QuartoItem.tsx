import { Quarto } from "@/services/quarto/types";
import Divider from "@/components/Divider";
import { MdBedroomParent } from "react-icons/md";

interface QuartoItemProps extends React.HTMLAttributes<HTMLDivElement> { 
    quarto: Quarto;
}
const QuartoItem = ({ quarto, ...props }: QuartoItemProps) => {
    return (
        <div 
            key={quarto?.quartoId}
            className="flex items-center shadow-sm bg-white gap-5 bg-opacity-80 p-3 rounded-md hover:bg-slate-100 cursor-pointer backdrop-blur-sm duration-200 data-[inmaintenance=true]:grayscale data-[inmaintenance=true]:brightness-90"
            {...props}
            data-inmaintenance={quarto?.emManutencao}
        >
            <MdBedroomParent size={50} className="text-primary" />
            <div className="flex flex-col">
                <p className="text-xl">Nº {quarto?.numero}</p>
                <p className="text-sm">{quarto?.lotacao} pessoas</p>
            </div>
            <p>{quarto?.tipo?.replaceAll?.("_", " ")}</p>
            <Divider direction="vertical" className="w-3 h-full grow-0 ml-auto" />
            <p className="mr-3 text-lg">{quarto?.preco?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}</p>
        </div>
    );
}

export default QuartoItem;
