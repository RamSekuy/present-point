"use client";

import DataTable from "@/components/dataTable";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/modalContext";
import { useUser } from "@/contexts/user.context";
import { axiosCSR } from "@/lib/axios.csr";
import axiosToast from "@/lib/toast";
import { TCuty } from "@/models/cuty.model.ts";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export default function CutyTable() {
  const { open, close } = useModal();
  const [cuty, setCuty] = useState<TCuty[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { user } = useUser();
  const getData = async (): Promise<TCuty[]> =>
    (await axiosCSR().get(`/cuty/${user?.id}`)).data.data;
  useEffect(() => {
    setLoading(true);
    getData()
      .then((e) => {
        setCuty(e);
      })
      .catch((e) => {
        if (e instanceof Error) alert(e.message);
      })
      .finally(() => setLoading(false));
  }, [user?.id]);
  if (isLoading) return <Loading label="Getting Cuty Data" />;
  const confirmPrompt = (cutyId: string) => {
    const handleSubmit = () => {
      axiosToast(axiosCSR().patch(`/cuty/${cutyId}`), () => {
        getData();
        close();
      });
    };
    return (
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <h1>Are you sure you want to confirm this cuty request?</h1>
        <div className="flex gap-4">
          <Button variant="destructive" onClick={close}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Confirm</Button>
        </div>
      </div>
    );
  };

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
        return isConfirmed ? (
          <div>{date}</div>
        ) : (
          <Button onClick={() => open(confirmPrompt(row.original.id))}>
            Confirm
          </Button>
        );
      },
    },
  ];
  return <DataTable columns={columns} data={cuty} />;
}
