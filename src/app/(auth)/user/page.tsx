"use client";

import AppIcon from "@/components/AppIcon";
import Button from "@/components/Button";
import Card from "@/components/Card";
import UserIcon from "@/components/UserIcon";
import { authorization } from "@/core";
import { useFeedback } from "@/providers/FeedbackProvider";
import apiCliente from "@/services/cliente/apiCliente";
import { useQueryListClientes } from "@/services/hotel";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { useCallback, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const updateUserFormSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
    dataNascimento: z.date({ coerce: true }).nullable(),
    telefone: z.string().min(1, "Telefone é obrigatório"),
    endereco: z.string().min(1, "Endereço é obrigatório")
}).superRefine((schema, ctx) => {
    if (!schema.dataNascimento) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Data de nascimento é obrigatória",
            path: ["dataNascimento"]
        });
    }
});

type UpdateUserFormType = z.infer<typeof updateUserFormSchema>;

const updateUserFormDefaultValues: UpdateUserFormType = {
    nome: "",
    email: "",
    dataNascimento: null,
    telefone: "",
    endereco: ""
};

const UserPage = () => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<UpdateUserFormType>({
        resolver: zodResolver(updateUserFormSchema),
        defaultValues: updateUserFormDefaultValues
    });

    const feedback = useFeedback();

    const { data: clienteList, refetch: refetchClientList, isFetching: isClienteListLoading } = useQueryListClientes();

    const { mutate: atualizarCliente, isLoading: isAtualizarClienteLoading } = useMutation({
        mutationFn: apiCliente.atualizarCliente,
        onSuccess: () => {
            refetchClientList();

            feedback({
                message: "Dados atualizados com sucesso",
                type: "success"
            });
        },
        onError: () => {
            feedback({
                message: "Erro ao atualizar dados",
                type: "error"
            });
        }
    })

    const thisUserData = useMemo(() => clienteList?.find((cliente) => cliente.email === authorization.getAccessToken()), [clienteList]);

    useEffect(() => {
        const dtNascimento = moment(thisUserData?.dataNascimento).toDate();
        dtNascimento.setUTCDate(dtNascimento.getUTCDate() + 1);

        reset({
            nome: thisUserData?.nome || "",
            email: thisUserData?.email || "",
            endereco: thisUserData?.endereco || "",
            telefone: thisUserData?.telefone || "",
            dataNascimento: dtNascimento || null
        });
    }, [reset, thisUserData]);

    const onSubmitHandler = useCallback((data: UpdateUserFormType) => {
        if (thisUserData?.clienteId) {
            atualizarCliente({
                cliente: { 
                    ...data, 
                    dataNascimento: moment(data.dataNascimento).format("YYYY-MM-DD") || "", 
                    clienteId: thisUserData?.clienteId 
                }
            });
        }
    }, [atualizarCliente, thisUserData?.clienteId]);

    const logoutUser = useCallback(() => {
        authorization.clearAuthData();

        window.location.reload();
    }, []);

    return (
        <div className="flex flex-col w-full h-full justify-center items-center">
            <Card>
                <div className="flex flex-col gap-5 w-[40vw]">
                    <p className="text-xl text-black text-opacity-60 mb-10">Atualizar Dados da Conta</p>
                    <UserIcon className="w-20 h-20" />
                    <form
                        className="my-auto gap-5 flex flex-col w-[90%] mx-auto grow pb-10"
                        onSubmit={handleSubmit(onSubmitHandler)}
                    >
                        <div className="grid grid-cols-2 w-full h-fit gap-5">
                            {isClienteListLoading 
                                ?
                            <>
                                <Skeleton className="h-20" />
                                <Skeleton className="h-20" />
                                <Skeleton className="h-20" />
                                <Skeleton className="h-20" />
                                <Skeleton className="h-20 col-span-2" />
                            </> : 
                            (<>
                                <Controller
                                    control={control}
                                    name="nome"
                                    render={({ field }) => (
                                        <TextField
                                            onChange={({ currentTarget: { value } }) => field.onChange(value)}
                                            value={field.value}
                                            variant="outlined"
                                            label="Nome"
                                            type="text"
                                            error={!!errors?.nome?.message}
                                            helperText={errors?.nome?.message}
                                        />
                                    )}                    
                                />
                                <Controller 
                                    control={control}
                                    name="email"
                                    render={({ field }) => (
                                        <TextField
                                            onChange={({ currentTarget: { value } }) => field.onChange(value)}
                                            value={field.value}
                                            variant="outlined"
                                            label="E-mail"
                                            type="email"
                                            error={!!errors?.email?.message}
                                            helperText={errors?.email?.message}
                                        />
                                    )}
                                />
                                <Controller 
                                    control={control}
                                    name="dataNascimento"
                                    render={({ field }) => (
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            label="Data de nascimento"
                                            value={moment(field.value) || null}
                                            onChange={(value) => field.onChange(value)}
                                            slotProps={{
                                                textField: {
                                                    error: !!errors?.dataNascimento?.message,
                                                    helperText: errors?.dataNascimento?.message,
                                                },
                                            }}
                                        />
                                    )}
                                />
                                <Controller 
                                    control={control}
                                    name="telefone"
                                    render={({ field }) => (
                                        <TextField
                                            onChange={({ currentTarget: { value } }) => field.onChange(value)}
                                            value={field.value}
                                            variant="outlined"
                                            label="Telefone"
                                            type="tel"
                                            error={!!errors?.telefone?.message}
                                            helperText={errors?.telefone?.message}
                                        />
                                    )}
                                />
                                <Controller 
                                    control={control}
                                    name="endereco"
                                    render={({ field }) => (
                                        <TextField
                                            className="col-span-2"
                                            onChange={({ currentTarget: { value } }) => field.onChange(value)}
                                            value={field.value}
                                            variant="outlined"
                                            label="Endereço"
                                            type="text"
                                            error={!!errors?.endereco?.message}
                                            helperText={errors?.endereco?.message}
                                        />
                                    )}
                                />
                            </>)}
                        </div>

                        {isClienteListLoading 
                            ? 
                            <Skeleton className="h-20" /> 
                            : 
                            <div className="flex gap-6">
                                <Button className="grow bg-red-500 hover:bg-red-600" type="button" loading={isAtualizarClienteLoading} onClick={logoutUser}>
                                    Sair
                                </Button>
                                <Button className="grow" type="submit" loading={isAtualizarClienteLoading}>
                                    Atualizar
                                </Button>
                            </div>
                        }
                    </form>
                </div>
            </Card>
        </div>
    );
}

export default UserPage;
