"use server";

import { axiosSSR } from "@/lib/axios.ssr";
import { revalidatePath } from "next/cache";
import userUpdateSchema from "@/lib/schema/userUpdate.schema";
import { formDataToObject, toNodeFormData } from "@/lib/utils";
import z from "zod";

export async function userUpdate(fd: FormData) {
  try {
    const raw = await formDataToObject(fd);
    const { id, ...updatePayload } = raw;
    const parsedData = userUpdateSchema.parse(updatePayload);
    const form = await toNodeFormData(parsedData);

    const me = await axiosSSR().get("/auth/me");
    const userId = me.data.data.id;

    const res = await axiosSSR().patchForm(`/auth/${userId}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    revalidatePath("/profile");

    return { message: res.data.message };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { message: error.message, isError: true };
    }
    return { message: "An unexpected error occurred", isError: true };
  }
}
