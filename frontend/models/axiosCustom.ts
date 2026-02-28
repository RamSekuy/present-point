import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";

interface CustomResponse<T = any> {
  message: string;
  data: T;
}

export type TAxisCustomRes<T = any> = AxiosResponse<CustomResponse<T>>;

export interface AxiosCustom extends Axios {
  get<T = CustomResponse, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;

  post<T = CustomResponse, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;

  put<T = CustomResponse, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;

  patch<T = CustomResponse, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;

  delete<T = CustomResponse, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
}
