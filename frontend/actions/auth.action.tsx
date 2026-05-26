"use server";

import { axiosSSR } from "@/lib/axios.ssr";
import { cookies } from "next/headers";
import loginSchema from "@/lib/schema/login.schema";
import registerSchema from "@/lib/schema/register.schema";
import z from "zod";
import { formDataToObject, toNodeFormData } from "@/lib/utils";
import axios from "axios";
import { BASE_API_URL } from "@/config/config";
import { TAxiosCustomRes } from "@/models/axiosCustom";

const accessCookieOptions: any = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 15 * 60,
};
const refreshCookieOptions: any = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 24 * 60 * 60,
};

export async function loginAction(_data: z.infer<typeof loginSchema>) {
  try {
    const parsedData = loginSchema.parse(_data);
    const { data } = await axiosSSR().post("/auth/v2", parsedData);

    const { accessToken, refreshToken } = data.data as IToken;
    const cookie = await cookies();
    cookie.set("aauth", accessToken, accessCookieOptions);
    cookie.set("rauth", refreshToken, refreshCookieOptions);

    return { message: data.message };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { message: error.message };
    }
    return { message: "An unexpected error occurred", isError: true };
  }
}

export async function registerAction(fd: FormData) {
  try {
    const raw = await formDataToObject(fd);
    const parsedData = registerSchema.parse(raw);
    const form = await toNodeFormData(parsedData);
    const res = await axiosSSR().postForm("/auth/v1/", form);
    return { message: res.data.message };
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return { message: error.message, isError: true };
    }

    return { message: "An unexpected error occurred", isError: true };
  }
}

export async function logoutAction() {
  try {
    const cookie = await cookies();
    cookie.delete("aauth");
    cookie.delete("rauth");
    return { message: "Logged out successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { message: error.message, isError: true };
    }
    return { message: "An unexpected error occurred", isError: true };
  }
}

export async function refreshTokenAction() {
  try {
    const cookie = await cookies();
    const rauth = cookie.get("rauth")?.value;
    if (!rauth) {
      return { message: "No refresh token found", isError: true };
    }
    const res = (await axios.post(
      BASE_API_URL + "/auth/v0",
      {},
      { headers: { Authorization: `Bearer ${rauth}` } },
    )) as TAxiosCustomRes<IToken>;

    const data = res.data;
    const { accessToken, refreshToken } = data.data;
    cookie.set("aauth", accessToken, accessCookieOptions);
    cookie.set("rauth", refreshToken, refreshCookieOptions);

    return { message: data.message, data: { accessToken, refreshToken } };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { message: error.message, isError: true };
    }
    console.log((error as any).message);
    return { message: "An unexpected error occurred", isError: true };
  }
}

// UTILS
type IToken = {
  accessToken: string;
  refreshToken: string;
};
