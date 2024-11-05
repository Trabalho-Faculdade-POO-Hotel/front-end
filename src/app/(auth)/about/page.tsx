"use client";

import AppIcon from "@/components/AppIcon";
import Card from "@/components/Card";
import { useQueryGetHotelData } from "@/services/hotel";
import { Skeleton } from "@mui/material";

const SobreNosPage = () => {
  const { data: hotelData, isLoading } = useQueryGetHotelData();

  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      <Card className="flex flex-col bg-white bg-opacity-80 backdrop-blur-md p-16 rounded-md w-[60%] mx-auto mt-10 mb-10 text-lg select-none">
        <AppIcon className="w-60 h-60 mx-auto inline mb-10" res="high" />
        <p className="mb-3">
          Bem-vindo ao Hotel Azul Marinho, o seu refúgio à beira-mar! Com localização privilegiada e vistas deslumbrantes do oceano, nosso hotel é o destino ideal para quem busca relaxamento, conforto e uma experiência inesquecível. 
          <br />
          <br />
          No Azul Marinho, acreditamos que cada hóspede merece momentos únicos e uma estadia personalizada, com atendimento atencioso e uma atmosfera acolhedora.
        </p>
        {isLoading ? <Skeleton className="mt-5 h-[80px]" /> : <p className="mt-10">{hotelData?.nome}, <br /><i>{hotelData?.endereco}</i></p>}
      </Card>
    </div>
  );
};

export default SobreNosPage;
