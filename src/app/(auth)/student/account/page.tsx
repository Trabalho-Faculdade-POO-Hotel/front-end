"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import "@/core/utils";
import {
  convertAPIDateStringToDate,
  convertDateToDateStringAPI,
  parseFormData,
} from "@/core/utils";
import { useAuthData } from "@/providers/AuthProvider";
import { useFeedback } from "@/providers/FeedbackProvider";
import apiAluno from "@/services/aluno/apiAluno";
import { AlunoDataResponse } from "@/services/auth/types";
import { useQueryGetFranquiaByFranquiaId } from "@/services/franquia";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    alunoNome: z
      .string({
        required_error: "Nome é obrigatório",
      })
      .min(1, "Nome é obrigatório"),
    alunoEndereco: z.string().nullable(),
    alunoTelefone: z.string().nullable(),
    alunoDataNascimento: z
      .date({
        coerce: true,
      })
      .nullable(),
    alunoEmail: z
      .string({
        required_error: "E-mail é obrigatório",
      })
      .min(1, "E-mail é obrigatório"),
    alunoSenha: z.string().nullable(),
    alunoSenhaConfirm: z.string().nullable(),
  })
  .superRefine((schema, ctx) => {
    if (
      schema.alunoSenha !== "" &&
      schema.alunoSenhaConfirm !== schema.alunoSenha
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "As senhas não batem",
        path: ["alunoSenhaConfirm"],
      });
    }

    return true;
  });

type FormSchemaType = z.infer<typeof formSchema>;

const formDefaultValues: FormSchemaType = {
  alunoNome: "",
  alunoEmail: "",
  alunoDataNascimento: null,
  alunoEndereco: "",
  alunoTelefone: "",
  alunoSenha: "",
  alunoSenhaConfirm: "",
};

const AccountPage = () => {
  const feedback = useFeedback();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  const authData = useAuthData();
  const alunoData = useMemo(
    () => authData.user?.userData as AlunoDataResponse,
    [authData.user?.userData]
  );

  const { data: franquia, isLoading: isFranquiaDataLoading } =
    useQueryGetFranquiaByFranquiaId(alunoData?.alunoFranquiaId);

  const { mutate: updateAlunoData, isLoading: isUpdateAlunoDataLoading } =
    useMutation({
      mutationFn: apiAluno.updateAlunoData,
      onSuccess() {
        feedback({
          message: "Dados atualizados com sucesso",
          type: "success",
        });

        window.location.reload();
      },
      onError(error: AxiosError<string>) {
        feedback({
          message:
            error?.response?.data?.toString() || "Erro ao atualizar os dados",
          type: "error",
        });
      },
    });

  useEffect(() => {
    reset({
      alunoNome: alunoData.alunoNome,
      alunoEmail: alunoData.alunoEmail,
      alunoEndereco: alunoData.alunoEndereco,
      alunoTelefone: alunoData.alunoTelefone,
      alunoDataNascimento: alunoData.alunoDataNascimento
        ? convertAPIDateStringToDate(alunoData.alunoDataNascimento)
        : null,
      alunoSenha: "",
      alunoSenhaConfirm: "",
    });
  }, [
    alunoData?.alunoDataNascimento,
    alunoData?.alunoEmail,
    alunoData?.alunoEndereco,
    alunoData?.alunoNome,
    alunoData?.alunoTelefone,
    reset,
  ]);

  const onSubmitHandler = useCallback(
    (formData: FormSchemaType) => {
      const parsedFormData = parseFormData(formData, {
        preserveEmptyStrings: false,
        preserveNull: false,
        preserveUndefined: false,
      });

      const submitData: Omit<Partial<FormSchemaType>, "alunoDataNascimento"> & {
        alunoDataNascimento?: string | null;
      } = {
        ...parsedFormData,
        alunoDataNascimento: !!parsedFormData.alunoDataNascimento
          ? convertDateToDateStringAPI(parsedFormData.alunoDataNascimento)
          : null,
      };

      delete submitData.alunoSenhaConfirm;

      updateAlunoData(submitData);
    },
    [updateAlunoData]
  );

  return (
    <div className="flex flex-col items-center py-10 gap-3">
      <Card className="flex flex-col w-[50%]">
        {isFranquiaDataLoading ? (
          <>
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </>
        ) : (
          <>
            <p>Meus dados de cadastro</p>
            <p className="text-sm text-gray-300">
              Você está matriculado na franquia &quot;{franquia?.franquiaNome}
              &quot;
            </p>
          </>
        )}
      </Card>
      <Card className="flex flex-col gap-3 w-[50%] p-7">
        <div className="grid grid-cols-3 gap-5">
          <Controller
            control={control}
            name="alunoNome"
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="Nome"
                value={field.value}
                onChange={({ currentTarget: { value } }) =>
                  field.onChange(value)
                }
                error={!!errors?.[field?.name]?.message}
                helperText={errors?.[field?.name]?.message}
              />
            )}
          />
          <TextField
            disabled
            variant="outlined"
            label="CPF"
            value={alunoData?.alunoCpf}
          />
          <Controller
            control={control}
            name="alunoEndereco"
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="Endereço"
                value={field.value}
                onChange={({ currentTarget: { value } }) =>
                  field.onChange(value)
                }
                error={!!errors?.[field?.name]?.message}
                helperText={errors?.[field?.name]?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="alunoTelefone"
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="Telefone"
                value={field.value}
                onChange={({ currentTarget: { value } }) =>
                  field.onChange(value)
                }
                error={!!errors?.[field?.name]?.message}
                helperText={errors?.[field?.name]?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="alunoEmail"
            render={({ field }) => (
              <TextField
                variant="outlined"
                type="email"
                label="E-mail"
                value={field.value}
                onChange={({ currentTarget: { value } }) =>
                  field.onChange(value)
                }
                error={!!errors?.[field?.name]?.message}
                helperText={errors?.[field?.name]?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="alunoDataNascimento"
            render={({ field }) => (
              <DatePicker
                format="DD/MM/YYYY"
                label="Data de nascimento"
                value={moment(field.value) || null}
                onChange={(value) => field.onChange(value)}
                slotProps={{
                  textField: {
                    error: !!errors?.alunoDataNascimento?.message,
                    helperText: errors?.alunoDataNascimento?.message,
                  },
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="alunoSenha"
            render={({ field }) => (
              <TextField
                type="password"
                variant="outlined"
                label="Senha"
                value={field.value}
                onChange={({ currentTarget: { value } }) =>
                  field.onChange(value)
                }
                error={!!errors?.[field?.name]?.message}
                helperText={errors?.[field?.name]?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="alunoSenhaConfirm"
            render={({ field }) => (
              <TextField
                type="password"
                variant="outlined"
                label="Digite a senha novamente"
                value={field.value}
                onChange={({ currentTarget: { value } }) =>
                  field.onChange(value)
                }
                error={!!errors?.[field?.name]?.message}
                helperText={errors?.[field?.name]?.message}
              />
            )}
          />
        </div>
        <Button
          className="grow-0 w-fit px-5 ml-auto mt-5 min-w-[200px]"
          loading={isUpdateAlunoDataLoading}
          onClick={handleSubmit(onSubmitHandler)}
        >
          Salvar Dados
        </Button>
      </Card>
    </div>
  );
};

export default AccountPage;
