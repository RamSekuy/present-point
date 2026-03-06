import { BASE_API_URL } from "@/config/config";
import axios from "axios";
import { getCookie } from "cookies-next/client";
import { AxiosCustom } from "@/models/axiosCustom";

export function axiosCSR(t?: string) {
  const token = t || getCookie("aauth");
  console.log(token);
  return axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }) as AxiosCustom;
}
