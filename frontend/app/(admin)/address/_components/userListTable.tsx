"use client";
import DataTable from "@/components/dataTable";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/modalContext";
import { TUser } from "@/models/user.model";
import { ColumnDef } from "@tanstack/react-table";
import UsersSelectTable from "./usersSelectTable";
import { useParams, useRouter } from "next/navigation";
import { axiosCSR } from "@/lib/axios.csr";
import axiosToast from "@/lib/toast";

type Props = {
  users: TUser[];
};

export default function UserListTable({ users }: Props) {
  const { refresh } = useRouter();
  const removeUserFromAddress = (userId: string) => {
    const p = axiosCSR().delete(`/userAddressAllow/${userId}`);
    axiosToast(p, () => {
      refresh();
    });
  };

  const columns: ColumnDef<TUser>[] = [
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
      accessorKey: "id",
      header: "Remove",
      cell: (info) => (
        <Button
          variant="destructive"
          onClick={() => {
            removeUserFromAddress(info.getValue() as string);
          }}
        >
          Remove
        </Button>
      ),
    },
  ];

  const { slug } = useParams();
  const { open } = useModal();
  return (
    <DataTable
      renderTop={() => (
        <div className="w-full flex justify-end py-2">
          <Button
            onClick={() =>
              open(<UsersSelectTable addressId={slug as string} />)
            }
          >
            Add User to Location
          </Button>
        </div>
      )}
      columns={columns}
      data={users}
      tableName="User List"
    />
  );
}
