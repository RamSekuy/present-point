"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useUser } from "@/contexts/user.context";
import { useQR } from "@/contexts/qr.context";
import actionToast from "@/lib/toast";
import { toast } from "sonner";
import QRReader from "@/components/qrReader";
import { QrcodeSuccessCallback } from "html5-qrcode";
import { createAttendanceAction } from "@/actions/attendance.action";
import { Button } from "@/components/ui/button";

export default function ScanAddressPage() {
  const params = useParams();
  const addressId = params.addressId as string;
  const { push } = useRouter();
  const { user } = useUser();
  const { startScanning, stopScanning } = useQR();

  const capturePhoto = useCallback(async (): Promise<Blob | null> => {
    const video = document.querySelector(
      "#qr-reader video",
    ) as HTMLVideoElement | null;
    if (!video) return null;

    const stream = video.srcObject as MediaStream;
    const track = stream.getVideoTracks()[0];

    const imageCapture = new ImageCapture(track);
    return await imageCapture.takePhoto();
  }, []);

  const getLocation = useCallback((): Promise<GeolocationCoordinates> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos.coords),
        (err) => reject(err),
      );
    });
  }, []);

  const handleQRSuccess = useCallback<QrcodeSuccessCallback>(
    async (decodedText) => {
      try {
        const image = await capturePhoto();
        await stopScanning();
        const coords = await getLocation();

        if (!image) {
          console.log("IMAGE ERROR");
          return toast.error("Gagal mengambil foto dari kamera");
        }

        const data = new FormData();
        data.append("latitude", coords.latitude.toString());
        data.append("longitude", coords.longitude.toString());
        data.append("image", image);

        if (!user?.id) {
          throw new Error("User tidak ditemukan");
        }

        const p = createAttendanceAction(addressId, user.id, data);
        actionToast(p, () => {
          push("/dashboard");
        });
      } catch (err) {
        console.error("Submit error:", err);
        toast.error("Terjadi kesalahan saat mengirim data");
      }
    },
    [capturePhoto, stopScanning, getLocation, addressId],
  );

  useEffect(() => {
    startScanning(handleQRSuccess).catch((err) => {
      console.error("Camera error:", err);
      toast.error("Gagal membuka kamera");
    });

    return () => {
      stopScanning();
    };
  }, [startScanning, stopScanning, handleQRSuccess]);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-2">
      <h1 className="text-2xl font-bold mb-8">Scan QR Code</h1>
      <QRReader width={400} />
      <button
        onClick={() => push("/attendance/scan")}
        className="mt-8 px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Kembali
      </button>
    </div>
  );
}
