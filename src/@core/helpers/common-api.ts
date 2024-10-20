import { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "../lib/axios";

/** Axios catch block handler */
const errorHandler = (error: {
  response: any;
  request?: any;
  message?: any;
}) => {
  throw error;
};

function apiGet<T = any>(
  apiPath: string,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<any>> {
  return axiosInstance
    .get(apiPath, config)
    .then((response: AxiosResponse<T>) => response)
    .catch(errorHandler);
}

function apiPost<R = any, T = any>(
  apiPath: string,
  data?: R,
  config: AxiosRequestConfig = {}
) {
  return axiosInstance
    .post(apiPath, data, config)
    .then((response: AxiosResponse<T>) => response)
    .catch(errorHandler);
}

function apiDelete<T = any>(apiPath: string) {
  return axiosInstance
    .delete(apiPath)
    .then((response: AxiosResponse<T>) => response)
    .catch(errorHandler);
}

function apiPut<R = any, T = any>(
  apiPath: string,
  data?: R,
  config: AxiosRequestConfig = {}
) {
  return axiosInstance
    .put(apiPath, data)
    .then((response: AxiosResponse<T>) => response)
    .catch(errorHandler);
}

export { apiDelete, apiGet, apiPost, apiPut };
