import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 300000,
//   withCredentials: true,
});
axiosInstance.defaults.headers.common["Accept"] = "application/json";
axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

export default axiosInstance;
