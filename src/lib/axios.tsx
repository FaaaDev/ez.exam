import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { getToken, clearToken } from "@/utils/token";
import { toast } from "sonner";
import ToastWrapper from "@/components/toast-wrapper";
import { Button } from "@/components/ui/button";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: inject Authorization
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      "[Request]",
      config.method?.toUpperCase(),
      config.url,
      config.data
    );
    return config;
  },
  (error: AxiosError) => {
    console.error("[Request Error]", error);
    return Promise.reject(error);
  }
);

// Response Interceptor: log response & handle 401
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("[Response]", response.config.url, response.data);

    return response;
  },
  (error: AxiosError) => {
    console.log(error);
    
    const status = error.response?.status;
    const message =
      (error.response?.data as { message?: string })?.message

    if (status === 401) {
      toast(
        <ToastWrapper
          label="Session End"
          description="Session Expired, Please login again"
          type="action"
          action={<Button size={"sm"}>Login</Button>}
        />
      );
      clearToken();
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } else if (status === 500) {
      toast(
        <ToastWrapper
          label="Error 500"
          description="Something went wrong. Internal server Error"
          type="error"
        />
      );
    } else if (message) {
      toast(
        <ToastWrapper
          label={`Error ${status}`}
          description={message}
          type="error"
        />
      );
    } else {
      toast(
        <ToastWrapper
          label="Error Connection Timeout"
          description="Please check your internet connection"
          type="error"
        />
      );
    }

    return Promise.reject(error);
  }
);

export default api;
