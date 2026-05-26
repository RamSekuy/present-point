"use client";

import { addUserToAddressAction } from "@/actions/address.action";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/modalContext";
import actionToast from "@/lib/toast";

type props = {
  addressId: string;
  userId: string;
};

export default function AddUser2AddressButton({ addressId, userId }: props) {
  const { close } = useModal();
  const addUser2Address = (userId: string) => {
    const p = addUserToAddressAction(addressId, userId);
    actionToast(p, () => {
      close();
    });
  };
  return (
    <Button
      onClick={() => {
        addUser2Address(userId);
      }}
    >
      Add
    </Button>
  );
}
