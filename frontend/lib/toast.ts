import { TAxiosCustomRes } from "@/models/axiosCustom";
import { AxiosError } from "axios";
import { CSSProperties } from "react";
import { toast } from "sonner";
import ServerLog from "./serverLog";

function download(data: any) {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "error.json";
  a.click();
}

export default function actionToast<T = any>(
  promise: Promise<{ message: string; data?: T; isError?: boolean }>,
  onSuccess: (res: T) => void = () => {},
  loading: string = "Loading...",
) {
  const newPromise = new Promise<{ message: string; data?: T }>(
    async (resolve, reject) => {
      const res = await promise;
      console.log(res);
      if (res.isError) {
        reject(res);
      }
      resolve(res as { message: string; data?: T });
    },
  );
  toast.promise(newPromise, {
    success: (res) => {
      onSuccess(res?.data as T);
      return {
        style: { color: "white", backgroundColor: "green" },
        message: res.message || "Success",
      };
    },
    loading,
    error: (e) => {
      const style: CSSProperties = { backgroundColor: "red", color: "white" };
      if (e instanceof AxiosError) {
        const message = e.response?.data.message || "AxiosError";
        ServerLog(e);
        console.log(message);
        return {
          message,
          style,
        };
      }
      const message = "Error: " + (e?.error?.message || e?.message);
      console.log(e);
      return {
        message,
        style,
      };
    },
  });
}
