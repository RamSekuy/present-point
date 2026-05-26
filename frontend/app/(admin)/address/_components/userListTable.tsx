"use client";
import DataTable from "@/components/dataTable";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/modalContext";
import { TUser } from "@/models/user.model";
import { ColumnDef } from "@tanstack/react-table";
import { useParams, useRouter } from "next/navigation";
import actionToast from "@/lib/toast";
import { removeUserFromAddressAction } from "@/actions/address.action";

type Props = {
  users: TUser[];
  children: React.ReactNode;
};

export default function UserListTable({ users, children }: Props) {
  const { refresh } = useRouter();
  const { slug } = useParams();
  const removeUserFromAddress = (userId: string) => {
    const p = removeUserFromAddressAction(slug as string, userId);
    actionToast(p, () => {
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
  const { open } = useModal();
  return (
    <DataTable
      renderTop={() => (
        <div className="w-full flex justify-end py-2">
          <Button onClick={() => open(children)}>Add User to Location</Button>
        </div>
      )}
      columns={columns}
      data={users}
      tableName="User List"
    />
  );
}
