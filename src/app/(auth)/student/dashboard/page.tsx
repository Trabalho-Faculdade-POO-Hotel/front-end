"use client";

import Card from "@/components/Card";
import UserIcon from "@/components/UserIcon";
import { useAuthData } from "@/providers/AuthProvider";
import { AlunoDataResponse } from "@/services/auth/types";
import { useQueryGetFranquiaByFranquiaId } from "@/services/franquia";
import { Skeleton } from "@mui/material";
import { useMemo } from "react";
import CoursesStatusCard from "./CoursesStatusCard";

const DashboardPage = () => {
  const authData = useAuthData();
  const userData = useMemo(() => {
    return authData.user?.userData as AlunoDataResponse;
  }, [authData.user?.userData]);

  const { data: franquia, isLoading: isFranquiaDataLoading } =
    useQueryGetFranquiaByFranquiaId(userData?.alunoFranquiaId);

  return (
    <div className="flex flex-col w-full grow overflow-x-hidden overflow-y-auto items-center py-5 gap-3 [&>*]:w-[50%]">
      <Card className="w-[50%] flex p-8 justify-start items-center gap-5">
        <UserIcon className="w-14 h-14 m-0" role="aluno" />
        <div className="flex flex-col grow">
          {!!userData?.alunoNome ? (
            <p className="text-lg">{userData?.alunoNome}</p>
          ) : (
            <Skeleton className="w-full" height={40} />
          )}
          {isFranquiaDataLoading ? (
            <Skeleton className="w-full" height={40} />
          ) : (
            <p className="text-sm text-gray-400">
              Matriculado(a) na franquia &quot;{franquia?.franquiaNome}&quot;
            </p>
          )}
        </div>
      </Card>
      <CoursesStatusCard className="h-auto" />
    </div>
  );
};

export default DashboardPage;
