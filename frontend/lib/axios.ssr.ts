import { BASE_API_URL } from "@/config/config";
import axios from "axios";
import { cookies } from "next/headers";

export async function axiosSSR() {
  const token = (await cookies()).get("access_token")?.value || "none";
  return axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
