"use client";

import DataTable from "@/components/dataTable";
import { TCuty } from "@/models/cuty.model.ts";
import { ColumnDef } from "@tanstack/react-table";
import { use } from "react";

interface CutyTableProps {
  cutyData: Promise<TCuty[]>;
}

export default function CutyTable({ cutyData }: CutyTableProps) {
  const cuty = use(cutyData);

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
  ];
  return <DataTable columns={columns} data={cuty} />;
}
