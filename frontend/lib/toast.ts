import { TAxiosCustomRes } from "@/models/axiosCustom";
import { AxiosError } from "axios";
import { CSSProperties } from "react";
import { toast } from "sonner";

function download(data: any) {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "error.json";
  a.click();
}

export default function axiosToast<T = any>(
  promise: Promise<TAxiosCustomRes<T>>,
  onSuccess: (res: T) => void,
) {
  toast.promise(promise, {
    success: (res) => {
      onSuccess(res.data.data);
      return {
        style: { color: "white", backgroundColor: "green" },
        message: res.data.message,
      };
    },
    loading: "Loading...",
    error: (e) => {
      const style: CSSProperties = { backgroundColor: "red", color: "white" };
      if (e instanceof AxiosError) {
        const message = e.response?.data.message || "AxiosError";
        // download(e);
        console.log(message);
        return {
          message,
          style,
        };
      }
      const message = "Error: " + e?.error?.message;
      console.log(e);
      return {
        message,
        style,
      };
    },
  });
}
