"use client";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useUser } from "@/contexts/user.context";
import { axiosCSR } from "@/lib/axios.csr";
import DataTable from "@/components/dataTable";
import { TAddress } from "@/models/address.model";

type Props = {
  onSelect: (id: string) => void;
};

export default function SelectAddressTable({ onSelect }: Props) {
  const { user } = useUser();
  const [addresses, setAddresses] = useState<TAddress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    axiosCSR()
      .get(`/address?userId='${user.id}`)
      .then((res) => setAddresses(res.data.data))
      .finally(() => setLoading(false));
  }, [user]);

  const columns: ColumnDef<TAddress>[] = [
    { accessorKey: "name", header: "Nama" },
    { accessorKey: "detail", header: "Detail" },
    { accessorKey: "latitude", header: "Latitude" },
    { accessorKey: "longitude", header: "Longitude" },
    { accessorKey: "radius", header: "Radius (m)" },
    {
      id: "action",
      header: "",
      cell: ({ row }) => (
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => onSelect(row.original.id)}
        >
          Pilih
        </button>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <DataTable columns={columns} data={addresses} tableName="Daftar Lokasi" />
  );
}
