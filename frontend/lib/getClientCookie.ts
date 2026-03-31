"use server";

import { cookies } from "next/headers";

export default async function getClientCookie(key: string) {
  const v = (await cookies()).get("aauth")?.value;
  console.log(v);
  return v;
}
