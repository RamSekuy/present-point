"use client";
import DataTable from "@/components/dataTable";
import { TUser } from "@/models/user.model";
import { ColumnDef } from "@tanstack/react-table";
import AddUser2AddressButton from "./addUser2AddressButton";

type TUserAddress = TUser & {
  userAddressAllow: {
    addressId: string;
  }[];
};

type Props = {
  data: TUserAddress[];
  addressId: string;
};
export default function UsersSelectTable({ data, addressId }: Props) {
  const columns: ColumnDef<TUserAddress>[] = [
    {
      accessorKey: "name",
      header: "Nama",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "userAddressAllow",
      header: "Select",
      cell: ({ row }) => (
        <AddUser2AddressButton addressId={addressId} userId={row.original.id} />
      ),
    },
  ];
  return (
    <DataTable
      renderTop={() => <div className="pt-4"></div>}
      columns={columns}
      data={data}
    />
  );
}
