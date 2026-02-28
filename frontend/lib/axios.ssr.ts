import { BASE_API_URL } from "@/config/config";
import { AxiosCustom } from "@/models/axiosCustom";
import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

type Method1 = "get" | "delete";
type Method2 = "post" | "put" | "patch";

async function instance() {
  const token = (await cookies()).get("aauth")?.value;

  return axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  }) as AxiosCustom;
}

export function axiosSSR() {
  // GET & DELETE
  const f1 = (method: Method1) => (url: string, config?: AxiosRequestConfig) =>
    instance().then((api) => api[method](url, config));

  // POST, PUT, PATCH
  const f2 =
    (method: Method2) =>
    (url: string, data?: any, config?: AxiosRequestConfig) =>
      instance().then((api) => api[method](url, data, config));

  return {
    get: f1("get"),
    delete: f1("delete"),
    post: f2("post"),
    put: f2("put"),
    patch: f2("patch"),
    instance,
  };
}
