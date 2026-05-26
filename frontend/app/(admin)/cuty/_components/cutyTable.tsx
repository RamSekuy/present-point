"use client";

import DataTable from "@/components/dataTable";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/modalContext";
import axiosToast from "@/lib/toast";
import { TCuty } from "@/models/cuty.model.ts";
import { ColumnDef } from "@tanstack/react-table";
import { use } from "react";
import { confirmCutyAction, rejectCutyAction } from "@/actions/cuty.action";

interface CutyTableProps {
  cutyData: Promise<TCuty[]>;
}

export default function CutyTable({ cutyData }: CutyTableProps) {
  const { open, close } = useModal();
  const cuty = use(cutyData);

  const confirmPrompt = (cutyId: string) => {
    const handleConfirm = () => {
      axiosToast(confirmCutyAction(cutyId), () => {
        close();
      });
    };

    const handleReject = () => {
      axiosToast(rejectCutyAction(cutyId), () => {
        close();
      });
    };

    return (
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <h1>Confirm or Reject this cuty request?</h1>
        <div className="flex gap-4">
          <Button variant="destructive" onClick={handleReject}>
            Reject
          </Button>
          <Button onClick={close}>Cancel</Button>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    );
  };

  const columns: ColumnDef<TCuty>[] = [
    {
      accessorKey: "user.name",
      header: "User",
      cell: ({ row }) => row.original.user?.name || "N/A",
    },
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusColors: Record<string, string> = {
          Pending: "bg-yellow-100 text-yellow-800",
          Confirmed: "bg-green-100 text-green-800",
          Rejected: "bg-red-100 text-red-800",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[status] || "bg-gray-100 text-gray-800"}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => new Date(row.original.updatedAt).toDateString(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const status = row.original.status;
        return status === "Pending" ? (
          <Button
            onClick={() => open(confirmPrompt(row.original.id))}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Review
          </Button>
        ) : (
          <span className="text-gray-500">-</span>
        );
      },
    },
  ];
  return <DataTable columns={columns} data={cuty} />;
}
