"use client";

import AnimatedBackground from "@/components/AnimatedBackground";
import Button from "@/components/Button";
import { authorization } from "@/core";
import { useFeedback } from "@/providers/FeedbackProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ZodIssueCode, z } from "zod";
import AppIcon from "../../../components/AppIcon";
import { useQueryListClientes } from "@/services/hotel";

const loginFormSchema = z
  .object({
    clienteEmail: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.clienteEmail === "" || !data.clienteEmail) {
      ctx.addIssue({
        message: "Você precisa informar o E-mail",
        code: ZodIssueCode.custom,
        path: ["clienteEmail"],
      });
    }
  });
type FormSchemaType = z.infer<typeof loginFormSchema>;

const LoginPage = () => {
  const router = useRouter();
  const feedback = useFeedback();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      clienteEmail: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = useCallback(
    (formData: FormSchemaType) => {
      authorization.saveAccessToken(formData.clienteEmail);

      feedback({
        message: "Seja bem-vindo !",
        type: "success",
      });
    },
    [feedback]
  );

  useEffect(() => {
    authorization.setOnNetworkError(() => {
      feedback({
        message: "Erro de conexão",
        type: "error",
      });
    });

    authorization.setOnUpdateAccessToken(() => {
      const accessToken = authorization.getAccessToken();

      // if (accessToken) {
      //   router.push("/student/dashboard");
      // }
    });
  }, [feedback, router]);

  const { data: clientesList } = useQueryListClientes();

  useEffect(() => {
    console.log(clientesList);
  }, [clientesList]);

  return (
    <div className="flex h-full w-full p-5">
      <AnimatedBackground />
      <div className="ml-auto flex h-full w-[400px] grow-0 flex-col items-center rounded-xl bg-white bg-opacity-80 backdrop-blur-xl shadow-md border-4 border-blue-400 !rounded-tl-[110px] !rounded-br-[110px]">
        <AppIcon className="mt-[20%]" />
        <p className="mt-8">Olá, coloque o seu e-mail para poder prosseguir</p>
        <form
          className="my-auto gap-5 flex flex-col w-[80%] mx-auto grow pt-10"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <TextField
            {...register("clienteEmail")}
            variant="outlined"
            label="E-mail"
            type="email"
            error={!!errors?.clienteEmail?.message}
            helperText={errors?.clienteEmail?.message}
          />
          <Button type="submit" loading={isLoading}>
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
