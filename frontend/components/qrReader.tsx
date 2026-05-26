"use client";

type Props = {
  width?: number;
};

export default function QRReader({ width = 250 }: Props) {
  return <div id="qr-reader" style={{ width }} />;
}
