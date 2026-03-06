"use client";
import QrScanner from "@/components/qrScanner";
import { useState } from "react";
import SelectAddressTable from "../_components/selectAddressTable";

export default function ScanMenu() {
  const [selectedAddress, setselectedAddress] = useState<string | null>(null);
  return (
    <div className="min-h-screen w-full flex justify-center items-center px-2">
      {selectedAddress ? (
        <QrScanner width={1000} addressId={selectedAddress} />
      ) : (
        <SelectAddressTable onSelect={setselectedAddress} />
      )}
    </div>
  );
}
