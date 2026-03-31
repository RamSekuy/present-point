"use client";
import DataTable from "@/components/dataTable";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/modalContext";
import { axiosCSR } from "@/lib/axios.csr";
import axiosToast from "@/lib/toast";
import { TUser } from "@/models/user.model";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Props = {
  addressId: string;
};

type TUserAddress = TUser & {
  userAddressAllow: {
    addressId: string;
  }[];
};

export default function UsersSelectTable({ addressId }: Props) {
  const [users, setUser] = useState<TUserAddress[]>([]);
  const { refresh } = useRouter();
  const { close } = useModal();
  const columns: ColumnDef<TUserAddress>[] = useMemo(() => {
    const addUser2Address = (userId: string) => {
      const p = axiosCSR().post(`/userAddressAllow/${addressId}`, { userId });
      axiosToast(p, () => {
        close();
        refresh();
      });
    };
    return [
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
        cell: ({ row }) => {
          const list = row.original.userAddressAllow;
          return list.some(({ addressId: id }) => id == addressId) ? (
            <p>Already Added</p>
          ) : (
            <Button
              onClick={() => {
                addUser2Address(row.original.id);
              }}
            >
              Add
            </Button>
          );
        },
      },
    ];
  }, [addressId]);

  useEffect(() => {
    async function fetchUsers() {
      return await axiosCSR().get("/user");
    }
    fetchUsers().then((e) => setUser(e.data.data));
  }, []);

  return <DataTable columns={columns} data={users} />;
}
