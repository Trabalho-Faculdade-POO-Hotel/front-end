import axios, { AxiosError, AxiosInstance } from "axios";

class CoreAuthTools {
  private axiosInstance: AxiosInstance;
  private loadedAccessToken: string | null;
  private onUpdateAccessToken: null | ((deauthenticated?: boolean) => void);
  private onNetworkError: null | (() => void);

  constructor() {
    this.axiosInstance = axios.create();
    this.loadedAccessToken = null;
    this.onUpdateAccessToken = null;
    this.onNetworkError = null;

    this.updateLoadedAccessToken();
    this.updateAxiosHeaders();
  }

  public getAxiosInstance() {
    return this.axiosInstance;
  }

  public getAccessToken() {
    return this.loadedAccessToken;
  }

  public setOnUpdateAccessToken(callback: (deauthenticated?: boolean) => void) {
    this.onUpdateAccessToken = callback;

    callback();
  }

  public setOnNetworkError = (callback: () => void) => {
    this.onNetworkError = callback;
  };

  public saveAccessToken(accessToken: string) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("accessToken", accessToken);
    }

    this.updateLoadedAccessToken();
    this.updateAxiosHeaders();

    if (this.onUpdateAccessToken) {
      this.onUpdateAccessToken(false);
    }
  }

  public clearAuthData(deauth = false) {
    this.clearAccessToken();

    if (this.onUpdateAccessToken) {
      this.onUpdateAccessToken(deauth);
    }
  }

  private clearAccessToken() {
    localStorage.removeItem("accessToken");
    this.loadedAccessToken = null;
  }

  private updateLoadedAccessToken() {
    let accessToken = null;

    if (typeof localStorage !== "undefined") {
      accessToken = localStorage.getItem("accessToken");
    }

    if (!accessToken) {
      this.loadedAccessToken = null;
    } else {
      this.loadedAccessToken = accessToken;
    }
  }

  private updateAxiosHeaders() {
    this.axiosInstance.interceptors.request.clear();

    this.axiosInstance.interceptors.request.use((config) => {
      if (this.loadedAccessToken !== null) {
        config.headers.Authorization = `Bearer ${this.loadedAccessToken}`;
      }

      config.baseURL =
        process.env.NEXT_PUBLIC_ENDPOINT_URL || "http://localhost:4000/";

      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (config) => config,
      (error: AxiosError<string>) => {
        if (error?.code === "ERR_NETWORK" && this.onNetworkError) {
          this.onNetworkError();
        }

        if (error?.response?.status === 401) {
          this.clearAuthData(true);
        }

        throw error;
      }
    );
  }
}

let coreTools: CoreAuthTools | null = null;
export const getCoreAuthTools = () => {
  if (coreTools == null) {
    coreTools = new CoreAuthTools();
  }

  return coreTools;
};
