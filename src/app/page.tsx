"use client";

import LoadingScreen from "@/components/LoadingScreen";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

const LoginPage = () => {
  const router = useRouter();

  const redirectToClienteLoginPage = useCallback(() => {
    router.push("/login/cliente");
  }, [router]);

  useEffect(() => {
    redirectToClienteLoginPage();
  }, [redirectToClienteLoginPage]);

  return (
    <LoadingScreen />
  );
};

export default LoginPage;
