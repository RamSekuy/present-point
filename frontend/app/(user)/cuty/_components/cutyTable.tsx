"use client";

import DataTable from "@/components/dataTable";
import { useUser } from "@/contexts/user.context";
import { axiosCSR } from "@/lib/axios.csr";
import { TCuty } from "@/models/cuty.model.ts";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export default function CutyTable() {
  const [cuty, setCuty] = useState<TCuty[]>([]);
  const { user } = useUser();
  const getData = async (): Promise<TCuty[]> =>
    (await axiosCSR().get(`/cuty/${user?.id}`)).data.data;
  useEffect(() => {
    getData()
      .then((e) => {
        setCuty(e);
      })
      .catch((e) => {
        if (e instanceof Error) alert(e.message);
      });
  }, [user?.id]);

  const columns: ColumnDef<TCuty>[] = [
    {
      accessorKey: "createdAt",
      header: "Requested At",
      cell: ({ row }) => new Date(row.original.createdAt).toDateString(),
    },
    {
      accessorKey: "startDate",
      header: "From",
      cell: ({ row }) => new Date(row.original.startDate).toDateString(),
    },
    {
      accessorKey: "endDate",
      header: "To",
      cell: ({ row }) => new Date(row.original.endDate).toDateString(),
    },
    {
      accessorKey: "isConfirmed",
      header: "Confirmed On",
      cell: ({ row }) => {
        const { isConfirmed, updatedAt } = row.original;
        const date = new Date(updatedAt).toDateString();
        return isConfirmed ? <div>{date}</div> : <div>Not Yet</div>;
      },
    },
  ];
  return <DataTable columns={columns} data={cuty} />;
}
