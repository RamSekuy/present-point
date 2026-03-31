import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";

interface CustomResponse<T = any> {
  message: string;
  data: T;
}

type Route =
  | "/attendance"
  | "/auth"
  | "/user"
  | "/address"
  | "/userAddressAllow"
  | "/cuty";

export type APIRouteUrl = Route | `${Route}/${string}` | `${Route}?${string}`;

export type TAxiosCustomRes<T = any> = AxiosResponse<CustomResponse<T>>;

export interface AxiosCustom extends Axios {
  get<T = CustomResponse, R = AxiosResponse<T>, D = any>(
    url: APIRouteUrl,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;

  post<T = CustomResponse, R = AxiosResponse<T>, D = any>(
    url: APIRouteUrl,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;

  put<T = CustomResponse, R = AxiosResponse<T>, D = any>(
    url: APIRouteUrl,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;

  patch<T = CustomResponse, R = AxiosResponse<T>, D = any>(
    url: APIRouteUrl,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;

  delete<T = CustomResponse, R = AxiosResponse<T>, D = any>(
    url: APIRouteUrl,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
}
