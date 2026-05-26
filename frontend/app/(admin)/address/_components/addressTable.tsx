"use client";

import DataTable from "@/components/dataTable";
import { useModal } from "@/contexts/modalContext";
import { deleteAddressAction } from "@/actions/address.action";
import { TAddress } from "@/models/address.model";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { MapPin, Pencil, Trash2, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AddressTable({ data }: { data: TAddress[] }) {
  const { open } = useModal();
  const { push } = useRouter();

  const columns: ColumnDef<TAddress>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 flex-shrink-0">
            <MapPin className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <span className="text-sm font-medium text-zinc-800">
            {row.original.name}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "detail",
      header: "Detail",
      cell: ({ row }) => (
        <span className="text-sm text-zinc-500">{row.original.detail}</span>
      ),
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => push("/address/" + row.original.id)}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium text-zinc-600 border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors"
          >
            <Pencil className="w-3 h-3" />
            Detail
          </button>
          <button
            onClick={() =>
              open(
                <DeletePrompt id={row.original.id} name={row.original.name} />,
              )
            }
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium text-red-600 border border-red-100 bg-red-50 hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
}

function DeletePrompt({ id, name }: { id: string; name: string }) {
  const { close } = useModal();
  const { refresh } = useRouter();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    const result = await deleteAddressAction(id);
    setLoading(false);
    if (!result.isError) {
      toast.success(result.message);
      close();
      refresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 py-2 px-1 text-center">
      <div className="flex items-center justify-center w-11 h-11 rounded-full bg-red-50">
        <TriangleAlert className="w-5 h-5 text-red-500" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-zinc-900">Delete address?</h3>
        <p className="text-xs text-zinc-400">
          <span className="font-medium text-zinc-600">{name}</span> will be
          permanently removed. This action cannot be undone.
        </p>
      </div>
      <div className="flex items-center gap-2 w-full">
        <button
          onClick={close}
          className="flex-1 h-9 rounded-lg text-sm text-zinc-600 border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onClick}
          disabled={loading}
          className={cn(
            "flex-1 h-9 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors",
            loading && "opacity-60 cursor-not-allowed",
          )}
        >
          {loading ? "Deleting…" : "Yes, delete"}
        </button>
      </div>
    </div>
  );
}
