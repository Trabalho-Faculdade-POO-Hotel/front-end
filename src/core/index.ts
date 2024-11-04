import { getCoreAuthTools } from "./coreAuthTools";

const coreAuthTools = getCoreAuthTools();

const APIAuthBase = coreAuthTools.getAxiosInstance();
const saveAccessToken = (accessToken: string) =>
  coreAuthTools.saveAccessToken(accessToken);
const getAccessToken = () => coreAuthTools.getAccessToken();
const setOnUpdateAccessToken = (
  callback: (deauthenticated?: boolean) => void
) => coreAuthTools.setOnUpdateAccessToken(callback);
const setOnNetworkError = (callback: () => void) =>
  coreAuthTools.setOnNetworkError(callback);
const clearAuthData = () => coreAuthTools.clearAuthData();

export const authorization = {
  saveAccessToken,
  getAccessToken,
  setOnUpdateAccessToken,
  setOnNetworkError,
  clearAuthData,
};

export const api = APIAuthBase;
