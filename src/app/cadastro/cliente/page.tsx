"use client";

import AnimatedBackground from "@/components/AnimatedBackground";
import AppIcon from "@/components/AppIcon";
import Button from "@/components/Button";
import { useFeedback } from "@/providers/FeedbackProvider";
import apiHotel from "@/services/hotel/apiHotel";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = z.object({
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

type RegisterFormType = z.infer<typeof registerFormSchema>;

const registerFormDefaultValues: RegisterFormType = {
    nome: "",
    email: "",
    dataNascimento: null,
    telefone: "",
    endereco: ""
};

const RegisterPage = () => {
    const router = useRouter();
    const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormType>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: registerFormDefaultValues
    });
    const feedback = useFeedback();

    const { mutate: adicionarCliente, isLoading } = useMutation({
        mutationFn: apiHotel.adicionarCliente,
        onSuccess: () => {
            feedback({
                message: "Cadastro realizado com sucesso, prossiga para o login",
                type: "success"
            });

            router.push("/login/cliente");
        },
        onError: () => {
            feedback({
                message: "Erro ao cadastrar cliente",
                type: "error"
            });
        }
    })

    const onSubmitHandler = useCallback((data: RegisterFormType) => {
        adicionarCliente({
            cliente: {
                ...data,
                dataNascimento: moment(data.dataNascimento).format("YYYY-MM-DD")
            }
        });
    }, [adicionarCliente]);

    return (
        <div className="flex flex-col w-full h-full justify-center items-center">
            <AnimatedBackground />

            <div className="m-auto flex h-[80%] pb-20 px-10 w-[50%] grow-0 flex-col items-center rounded-xl bg-white bg-opacity-80 backdrop-blur-xl shadow-md border-4 border-blue-400 !rounded-tl-[110px] !rounded-br-[110px]">
                <AppIcon className="mt-2" />
                <p className="mt-4 uppercase text-lg font-bold text-opacity-60 text-black">Cadastro de cliente</p>
                <form
                className="my-auto gap-5 flex flex-col w-[80%] mx-auto grow pt-10"
                onSubmit={handleSubmit(onSubmitHandler)}
                >
                    <div className="grid grid-cols-2 w-full h-fit gap-5">
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
                    </div>

                    <Button type="submit" loading={isLoading}>
                        Cadastrar
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
