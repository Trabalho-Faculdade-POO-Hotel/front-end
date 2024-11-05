"use client";

import AnimatedBackground from "@/components/AnimatedBackground";
import AppIcon from "@/components/AppIcon";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = z.object({
    nome: z.string(),
    email: z.string(),
    dataNascimento: z.date({ coerce: true }).nullable(),
    telefone: z.string(),
    endereco: z.string()
});

type RegisterFormType = z.infer<typeof registerFormSchema>;

const RegisterPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormType>({
        resolver: zodResolver(registerFormSchema)
    });

    const onSubmitHandler = useCallback((data: RegisterFormType) => {
        console.log(data);
    }, []);

    return (
        <div className="flex flex-col w-full h-full justify-center items-center">
            <AnimatedBackground />

            <div className="m-auto flex h-[80%] pb-20 px-10 w-[50%] grow-0 flex-col items-center rounded-xl bg-white bg-opacity-80 backdrop-blur-xl shadow-md border-4 border-blue-400 !rounded-tl-[110px] !rounded-br-[110px]">
                <AppIcon className="mt-10" />
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

                    <Button type="submit" loading={false}>
                        Cadastrar
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
