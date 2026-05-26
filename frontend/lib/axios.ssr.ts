import { BASE_API_URL } from "@/config/config";
import { APIRouteUrl, AxiosCustom } from "@/models/axiosCustom";
import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

type Method1 = "get" | "delete";
type Method2 = "post" | "put" | "patch";
type Method3 = "postForm" | "putForm" | "patchForm";

type IToken = {
  accessToken: string;
  refreshToken: string;
};

class AxiosSSR {
  private static accessCookieOptions: any = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60,
  };
  private static refreshCookieOptions: any = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60,
  };

  private static createInstance(token?: string): AxiosCustom {
    return axios.create({
      baseURL: BASE_API_URL,
      withCredentials: true,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    }) as AxiosCustom;
  }

  private static async refreshTokenAPI(refreshToken: string): Promise<IToken> {
    const res = await axios.post(
      BASE_API_URL + "/auth/v0",
      {},
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      },
    );

    return res.data.data;
  }

  private static async getInstance(): Promise<AxiosCustom> {
    const cookieStore = await cookies();
    const access = cookieStore.get("aauth")?.value;
    const refresh = cookieStore.get("rauth")?.value;

    if (access) {
      return this.createInstance(access);
    }

    if (refresh) {
      try {
        const { accessToken, refreshToken } =
          await this.refreshTokenAPI(refresh);
        cookieStore.set("aauth", accessToken, this.accessCookieOptions);
        cookieStore.set("rauth", refreshToken, this.refreshCookieOptions);
        return this.createInstance(accessToken);
      } catch {
        return this.createInstance();
      }
    }

    return this.createInstance();
  }

  private static method1(method: Method1) {
    return (url: APIRouteUrl, config?: AxiosRequestConfig) =>
      this.getInstance().then((api) => api[method](url, config));
  }

  private static method2(method: Method2) {
    return (url: APIRouteUrl, data?: any, config?: AxiosRequestConfig) =>
      this.getInstance().then((api) => api[method](url, data, config));
  }

  private static method3(method: Method3) {
    return (url: APIRouteUrl, data?: any, config?: AxiosRequestConfig) =>
      this.getInstance().then((api) => api[method](url, data, config));
  }

  static create() {
    return {
      get: this.method1("get"),
      delete: this.method1("delete"),
      post: this.method2("post"),
      put: this.method2("put"),
      patch: this.method2("patch"),
      postForm: this.method3("postForm"),
      putForm: this.method3("putForm"),
      patchForm: this.method3("patchForm"),
    };
  }
}

export function axiosSSR(token = false) {
  return AxiosSSR.create();
}
