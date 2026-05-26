"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useRef,
} from "react";

import {
  Html5Qrcode,
  QrcodeSuccessCallback,
  QrcodeErrorCallback,
  Html5QrcodeCameraScanConfig,
  Html5QrcodeScannerState,
} from "html5-qrcode";

import { toast } from "sonner";

type QRContextType = {
  isScanning: boolean;

  startScanning: (
    onSuccess: QrcodeSuccessCallback,
    onError?: QrcodeErrorCallback,
  ) => Promise<void>;

  stopScanning: () => Promise<void>;
};

const QRContext = createContext<QRContextType | undefined>(undefined);

type QRProviderProps = {
  children: ReactNode;
};

export function QRProvider({ children }: QRProviderProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [toastId, setToastId] = useState<string | number | null>(null);
  const isTransitioningRef = useRef(false);

  const defaultConfig: Html5QrcodeCameraScanConfig = {
    fps: 5,
    qrbox: {
      width: 250,
      height: 250,
    },
  };

  const defaultError: QrcodeErrorCallback = () => {};

  const stopScanning = useCallback(async () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    try {
      // Dismiss all toasts
      toast.dismiss();
      setToastId(null);

      const currentScanner = scannerRef.current;
      if (!currentScanner) return;

      const state = currentScanner.getState();
      if (state === Html5QrcodeScannerState.SCANNING) {
        await currentScanner.stop();
      }

      await currentScanner.clear();
      scannerRef.current = null;
      setIsScanning(false);
    } catch (error) {
      console.error("Error stopping scanner:", error);
    } finally {
      isTransitioningRef.current = false;
    }
  }, []);

  const startScanning = useCallback(
    async (
      onSuccess: QrcodeSuccessCallback,
      onError: QrcodeErrorCallback = defaultError,
    ) => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      try {
        await stopScanning();
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newScanner = new Html5Qrcode("qr-reader");
        scannerRef.current = newScanner;

        await newScanner.start(
          {
            facingMode: "environment",
          },
          defaultConfig,
          onSuccess,
          onError,
        );

        setIsScanning(true);

        // Show loading toast with stop button
        const id = toast.loading("Scanning QR Code...", {
          action: {
            label: "Stop",
            onClick: () => {
              stopScanning();
            },
          },
        });

        setToastId(id);
      } catch (error) {
        console.error("Error starting scanner:", error);
        setIsScanning(false);
        scannerRef.current = null;
        throw error;
      } finally {
        isTransitioningRef.current = false;
      }
    },
    [stopScanning],
  );

  // cleanup unmount
  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, [stopScanning]);

  return (
    <QRContext.Provider
      value={{
        isScanning,
        startScanning,
        stopScanning,
      }}
    >
      {children}
    </QRContext.Provider>
  );
}

export function useQR() {
  const context = useContext(QRContext);

  if (!context) {
    throw new Error("useQR must be used within QRProvider");
  }

  return context;
}
