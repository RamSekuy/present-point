"use client";

import { useEffect, useRef } from "react";
import {
  Html5Qrcode,
  QrcodeSuccessCallback,
  QrcodeErrorCallback,
  Html5QrcodeCameraScanConfig,
  Html5QrcodeScannerState,
} from "html5-qrcode";
import { axiosCSR } from "@/lib/axios.csr";
import axiosToast from "@/lib/toast";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@/contexts/user.context";

type Props = {
  onError?: QrcodeErrorCallback;
  config?: Html5QrcodeCameraScanConfig;
  width?: number;
  addressId: string;
};

const defaultError: QrcodeErrorCallback = () => {};

const defaultConfig: Html5QrcodeCameraScanConfig = { fps: 5 };

export default function QrScanner({
  onError = defaultError,
  config = defaultConfig,
  width = 250,
  addressId,
}: Props) {
  const qrRef = useRef<Html5Qrcode | null>(null);
  const { push } = useRouter();
  const { user } = useUser();
  const capturePhoto = async (): Promise<Blob | null> => {
    const video = document.querySelector(
      "#reader video",
    ) as HTMLVideoElement | null;
    if (!video) return null;

    const stream = video.srcObject as MediaStream;
    const track = stream.getVideoTracks()[0];

    const imageCapture = new ImageCapture(track);
    return await imageCapture.takePhoto();
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

    const handleSuccess: QrcodeSuccessCallback = async (decodedText) => {
      try {
        const image = await capturePhoto();
        await qr.stop();
        const coords = await getLocation();
        if (!image) {
          console.log("IMAGE ERROR");
          return toast.error("Something Went Wrong on the Image");
        }
        const data = new FormData();
        data.append("latitude", coords.latitude.toString());
        data.append("longitude", coords.longitude.toString());
        data.append("addressId", addressId);
        data.append("image", image);
        const p = axiosCSR().post(
          `/attendance/${addressId}/${user?.id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        axiosToast(p, () => {
          push("/dashboard");
        });
      } catch (err) {
        console.error("Submit error:", err);
        toast("Something went Wrong");
      }
    };

    const startScanner = async () => {
      try {
        await getLocation();
        // if (qr.isScanning) return;
        await qr.start(
          { facingMode: "environment" },
          config,
          handleSuccess,
          onError,
        );
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startScanner();

    return () => {
      if (qrRef.current) {
        const state = qr.getState();
        if (state == Html5QrcodeScannerState.SCANNING) {
          qrRef.current.stop().catch(() => {});
        }
      }
    };
  }, []);
  const pathname = usePathname();
  useEffect(() => {
    return () => {
      const stopScanner = async () => {
        try {
          if (qrRef.current) {
            await qrRef.current.stop();
            qrRef.current.clear();
          }
        } catch {}
      };
      stopScanner();
    };
  }, [pathname]);

  return <div id="reader" style={{ width }} />;
}
