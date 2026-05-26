"use server";

import { axiosSSR } from "@/lib/axios.ssr";
import { revalidatePath } from "next/cache";
import { attendanceCreateSchema } from "@/lib/schema/attendance.schema";
import z from "zod";

export async function createAttendanceAction(
  addressId: string,
  userId: string,
  formData: FormData,
) {
  try {
    const parsedData = attendanceCreateSchema.parse({ addressId, userId });
    const { data } = await axiosSSR().postForm(
      `/attendance/${parsedData.addressId}/${parsedData.userId}`,
      formData,
    );
    revalidatePath("/attendance");
    return { message: data.message };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { message: error.message, isError: true };
    }
    console.error("Attendance error:", error);
    return { message: "An unexpected error occurred", isError: true };
  }
}
