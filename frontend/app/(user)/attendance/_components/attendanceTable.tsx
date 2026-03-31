"use client";

import DataTable from "@/components/dataTable";
import { TAttendance } from "@/models/attandance.model";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<TAttendance>[] = [
  { accessorKey: "addressId" },
  { accessorKey: "createdAt", header: "Time" },
];

export default function AttendanceTable({ data }: { data: TAttendance[] }) {
  return <DataTable data={data} columns={columns} />;
}
