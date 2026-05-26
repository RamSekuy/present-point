import axios from "axios";
import z, { treeifyError } from "zod";

type TActionSuccess<T = unknown> = {
  isError?: false;
  message: string;
  data?: T;
};

type TActionError = {
  isError: true;
  message: string;
  errors?: unknown;
};

export type TActionResult<T = unknown> = TActionSuccess<T> | TActionError;

export async function entityAction<T>(
  cb: () => Promise<TActionResult<T>>,
): Promise<TActionResult<T>> {
  try {
    return await cb();
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return {
        isError: true,
        message: error.issues[0]?.message || "Validation error",
        errors: treeifyError(error),
      };
    }

    if (axios.isAxiosError(error)) {
      return {
        isError: true,
        message:
          error.response?.data?.message || error.message || "Request failed",
      };
    }

    return {
      isError: true,
      message: "An unexpected error occurred",
    };
  }
}
