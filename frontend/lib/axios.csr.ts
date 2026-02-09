import { BASE_API_URL } from "@/config/config";
import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

export function axiosCSR(): AxiosInstance {
  const token = getCookie("access_token");
  return axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
