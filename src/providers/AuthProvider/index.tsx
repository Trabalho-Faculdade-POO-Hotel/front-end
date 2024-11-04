"use client";

import { authorization } from "@/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFeedback } from "../FeedbackProvider";

interface AuthData {}

interface AuthProviderData {
  authData: AuthData;
  subscriptions: Array<(authData: AuthData) => void>;
}

const authProviderData: AuthProviderData = {
  authData: {
    user: null,
  },
  subscriptions: [],
};

export const useAuthData = () => {
  const [authData, setAuthData] = useState<AuthData>({
    ...authProviderData.authData,
  });

  useEffect(() => {
    authProviderData.subscriptions.push(setAuthData);

    return () => {
      authProviderData.subscriptions.splice(
        authProviderData.subscriptions.indexOf(setAuthData),
        1
      );
    };
  }, []);

  return authData;
};

interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
  onDeauthRoute: string;
}
const AuthProvider = ({ children, onDeauthRoute }: AuthProviderProps) => {
  const feedback = useFeedback();
  const router = useRouter();

  useEffect(() => {
    authorization.setOnNetworkError(() => {
      feedback({
        message: "Erro de conexão",
        type: "error",
      });
    });

    authorization.setOnUpdateAccessToken(async (deauthenticated) => {
      if (authorization.getAccessToken() === null) {
        router.push(onDeauthRoute);

        if (deauthenticated) {
          feedback({
            message: "Seu acesso expirou",
            type: "info",
          });
        }
      } else if (!authProviderData.authData) {
        authProviderData.authData = {};

        authProviderData.subscriptions.forEach((callback) =>
          callback(authProviderData.authData)
        );
      }
    });
  }, [feedback, onDeauthRoute, router]);

  return children;
};

export default AuthProvider;
