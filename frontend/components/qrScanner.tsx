"use client";

import { useEffect, useRef } from "react";
import {
  Html5Qrcode,
  QrcodeSuccessCallback,
  QrcodeErrorCallback,
  Html5QrcodeCameraScanConfig,
} from "html5-qrcode";
import { axiosCSR } from "@/lib/axios.csr";

type Props = {
  onSuccess?: QrcodeSuccessCallback;
  onError?: QrcodeErrorCallback;
  config?: Html5QrcodeCameraScanConfig;
  width?: number;
};

const defaultError: QrcodeErrorCallback = () => {};

const defaultConfig: Html5QrcodeCameraScanConfig = { fps: 5 };

export default function QrScanner({
  onError = defaultError,
  onSuccess,
  config = defaultConfig,
  width = 250,
}: Props) {
  const qrRef = useRef<Html5Qrcode | null>(null);
  const isRunning = useRef(false);
  const isSubmitting = useRef(false);

  const capturePhoto = () => {
    const video = document.querySelector(
      "#reader video",
    ) as HTMLVideoElement | null;

    if (!video) return null;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    return canvas.toDataURL("image/webp"); // base64
  };

  const getLocation = (): Promise<GeolocationCoordinates> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos.coords),
        (err) => reject(err),
      );
    });
  };

  useEffect(() => {
    const qr = new Html5Qrcode("reader");
    qrRef.current = qr;

    const handleSuccess: QrcodeSuccessCallback = async (
      decodedText,
      result,
    ) => {
      if (isSubmitting.current) return;
      isSubmitting.current = true;

      try {
        await qr.stop();

        const image = capturePhoto();
        const coords = await getLocation();

        const addressId = "90";

        await axiosCSR().post("/attendance/" + addressId, {
          qr: decodedText,
          image,
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy: coords.accuracy,
        });

        onSuccess?.(decodedText, result);
      } catch (err) {
        console.error("Submit error:", err);
        isSubmitting.current = false;
      }
    };

    const startScanner = async () => {
      try {
        await qr.start(
          { facingMode: "environment" },
          config,
          handleSuccess,
          onError,
        );
        isRunning.current = true;
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startScanner();

    return () => {
      if (qrRef.current && isRunning.current) {
        qrRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return <div id="reader" style={{ width }} />;
}
