import { BASE_API_URL } from "@/config/config";
import axios from "axios";
import { getCookie } from "cookies-next";
import { AxiosCustom } from "@/models/axiosCustom";

export function axiosCSR() {
  const token = getCookie("aauth");
  return axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }) as AxiosCustom;
}
