import axios from "axios";
import { cookies } from "next/headers";

import { envConfig } from "../config/envConfig";

const axiosInstance = axios.create({
  baseURL: envConfig.api_host,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      if (config.headers) {
        config.headers["cookie"] = `accessToken=${accessToken}`;
      } else {
        (config as any).headers = {
          cookie: `accessToken=${accessToken}`,
        };
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(function (response) {
  return response;
});

export default axiosInstance;
