"use client";

import { TbWorldQuestion } from "react-icons/tb";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 justify-center items-center select-none">
      <p>
        <TbWorldQuestion className={"text-primary"} size="100px" />
      </p>
      <p className="font-bold text-6xl text-secondary">404</p>
      <p className="text-2xl">Ops, ocorreu um erro.</p>
      <p>Esta página não existe ou não pôde ser encontrada.</p>
      <Button onClick={router.back}>Voltar para a página anterior</Button>
    </div>
  );
};

export default NotFoundPage;
