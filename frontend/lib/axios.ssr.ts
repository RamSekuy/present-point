import axios from "axios";
import { cookies } from "next/headers";

export async function axiosSSR() {
  const token = (await cookies()).get("access_token")?.value || "";
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
