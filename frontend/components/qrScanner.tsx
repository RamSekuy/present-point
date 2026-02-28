"use client";

import { useEffect } from "react";
import {
  Html5Qrcode,
  QrcodeSuccessCallback,
  QrcodeErrorCallback,
  Html5QrcodeCameraScanConfig,
} from "html5-qrcode";
import ServerLog from "@/lib/serverLog";

type Props = {
  onSuccess?: QrcodeSuccessCallback;
  onError?: QrcodeErrorCallback;
  config?: Html5QrcodeCameraScanConfig;
  width?: number;
};

const defaultSuccess: QrcodeSuccessCallback = (d, r) => {
  ServerLog(d);
};

const defaulError: QrcodeErrorCallback = (msg, err) => {};

const defaultConfig: Html5QrcodeCameraScanConfig = { fps: 5 };

export default function QrScanner({
  onError = defaulError,
  onSuccess = defaultSuccess,
  config = defaultConfig,
  width = 250,
}: Props) {
  useEffect(() => {
    const qr = new Html5Qrcode("reader");

    const startScanner = async () => {
      try {
        await qr.start({ facingMode: "user" }, config, onSuccess, onError);
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startScanner();

    return () => {
      qr.stop().catch(() => {});
    };
  }, []);

  return <div id="reader" style={{ width }} />;
}
