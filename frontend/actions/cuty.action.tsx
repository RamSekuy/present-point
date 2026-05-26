"use server";

import { axiosSSR } from "@/lib/axios.ssr";
import cutyCreateSchema from "@/lib/schema/cutyCreate.schema";
import cutyIdSchema from "@/lib/schema/cutyId.schema";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function createCutyAction(
  _data: z.infer<typeof cutyCreateSchema>,
) {
  try {
    const parsedData = cutyCreateSchema.parse(_data);
    const { data } = await axiosSSR().post(
      `/cuty/${parsedData.userId}`,
      parsedData,
    );
    revalidatePath("/cuty");
    return { message: data.message };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { message: error.message, isError: true };
    }
    return { message: "An unexpected error occurred", isError: true };
  }
}

export async function confirmCutyAction(cutyId: string) {
  try {
    const parsedData = cutyIdSchema.parse({ cutyId });
    const { data } = await axiosSSR().patch(
      `/cuty/${parsedData.cutyId}/confirm`,
    );
    revalidatePath("/admin/cuty/confirm");
    return { message: data.message };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { message: error.message, isError: true };
    }
    return { message: "An unexpected error occurred", isError: true };
  }
}

export async function rejectCutyAction(cutyId: string) {
  try {
    const parsedData = cutyIdSchema.parse({ cutyId });
    const { data } = await axiosSSR().patch(
      `/cuty/${parsedData.cutyId}/reject`,
    );
    revalidatePath("/admin/cuty/confirm");
    return { message: data.message };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { message: error.message, isError: true };
    }
    return { message: "An unexpected error occurred", isError: true };
  }
}
