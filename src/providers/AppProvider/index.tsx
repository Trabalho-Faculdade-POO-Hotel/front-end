"use client";

import { ptBR } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers";
import FeedbackProvider from "../FeedbackProvider";
import QueryProvider from "../QueryProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/pt-br";
import TooltipProvider from "../TooltipProvider";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const theme = createTheme({}, ptBR);

interface AppProviderProps {
  children: React.ReactNode | React.ReactNode[];
}
const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <FeedbackProvider>
      <TooltipProvider>
        <QueryProvider>
          <LocalizationProvider
            dateAdapter={AdapterMoment}
            adapterLocale="pt-br"
          >
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
            <ReactQueryDevtools />
          </LocalizationProvider>
        </QueryProvider>
      </TooltipProvider>
    </FeedbackProvider>
  );
};

export default AppProvider;
