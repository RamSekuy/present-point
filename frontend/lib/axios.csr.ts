import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

export function axiosCSR(): AxiosInstance {
  const token = getCookie("access_token");
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
