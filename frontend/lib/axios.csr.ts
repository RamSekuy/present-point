import { BASE_API_URL } from "@/config/config";
import { APIRouteUrl, AxiosCustom } from "@/models/axiosCustom";
import axios, { AxiosRequestConfig } from "axios";
import getClientCookie from "./getClientCookie";

type Method1 = "get" | "delete";
type Method2 = "post" | "put" | "patch";

async function instance(t?: string) {
  const token = t || (await getClientCookie("aauth"));

  return axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  }) as AxiosCustom;
}

export function axiosCSR(token?: string) {
  // GET & DELETE
  const f1 =
    (method: Method1) => (url: APIRouteUrl, config?: AxiosRequestConfig) =>
      instance(token).then((api) => api[method](url, config));

  // POST, PUT, PATCH
  const f2 =
    (method: Method2) =>
    (url: APIRouteUrl, data?: any, config?: AxiosRequestConfig) =>
      instance(token).then((api) => api[method](url, data, config));

  return {
    get: f1("get"),
    delete: f1("delete"),
    post: f2("post"),
    put: f2("put"),
    patch: f2("patch"),
    instance,
  };
}
