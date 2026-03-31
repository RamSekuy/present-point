"use client";

import DataTable from "@/components/dataTable";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/modalContext";
import { axiosCSR } from "@/lib/axios.csr";
import axiosToast from "@/lib/toast";
import { TAddress } from "@/models/address.model";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

export default function AddressTable({ data }: { data: TAddress[] }) {
  const { open } = useModal();
  const { push } = useRouter();

  const coloumns: ColumnDef<TAddress>[] = [
    {
      accessorKey: "name",
    },
    {
      accessorKey: "detail",
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-x-2">
          <Button onClick={() => push("/address/" + row.original.id)}>
            Detail
          </Button>
          <Button
            variant="destructive"
            onClick={() => open(<DeletePrompt id={row.original.id} />)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return <DataTable columns={coloumns} data={data} />;
}

function DeletePrompt({ id }: { id: string }) {
  const { close } = useModal();
  const { refresh } = useRouter();
  const onClick = () => {
    const p = axiosCSR().delete(`/address/${id}`);
    axiosToast(p, () => {
      close();
      refresh();
    });
  };

  return (
    <div className="flex flex-col text-center justify-center items-center gap-2 py-2">
      <h1 className="text-xl">Are you sure to delete this address ?</h1>
      <Button variant={"destructive"} onClick={onClick}>
        Delete
      </Button>
    </div>
  );
}
