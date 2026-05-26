"use server";
import z from "zod";

import { axiosSSR } from "@/lib/axios.ssr";

import addressCreateSchema from "@/lib/schema/addressCreate.schema";

import {
  deleteAddressSchema,
  removeUserFromAddressSchema,
  addUserToAddressSchema,
} from "@/lib/schema/addressAllow.schema";
import { revalidatePath } from "next/cache";

import { entityAction } from "./entity.action";

export async function deleteAddressAction(id: string) {
  return entityAction(async () => {
    const parsedData = deleteAddressSchema.parse({
      id,
    });

    const { data } = await axiosSSR().delete(`/address/${parsedData.id}`);

    revalidatePath("/address");
    revalidatePath("/scan");

    return {
      message: data.message,
    };
  });
}

export async function createAddressAction(
  _data: z.infer<typeof addressCreateSchema>,
) {
  return entityAction(async () => {
    const parsedData = addressCreateSchema.parse(_data);

    const { data } = await axiosSSR().post("/address/c", parsedData);

    revalidatePath("/address");

    return {
      message: data.message,
    };
  });
}

export async function updateAddressAction(
  id: string,
  _data: z.infer<typeof addressCreateSchema>,
) {
  return entityAction(async () => {
    const parsedId = deleteAddressSchema.parse({
      id,
    });

    const parsedData = addressCreateSchema.parse(_data);

    const { data } = await axiosSSR().patch(
      `/address/${parsedId.id}`,
      parsedData,
    );

    revalidatePath("/address");

    revalidatePath(`/address/${parsedId.id}`);

    return {
      message: data.message,
    };
  });
}

export async function removeUserFromAddressAction(
  _adressId: string,
  _userId: string,
) {
  return entityAction(async () => {
    const { userId, addressId } = removeUserFromAddressSchema.parse({
      userId: _userId,
      addressId: _adressId,
    });

    const { data } = await axiosSSR().delete(
      `/userAddressAllow/${addressId}/${userId}`,
    );

    revalidatePath("/address");
    revalidatePath("/scan");

    return {
      message: data.message,
    };
  });
}

export async function addUserToAddressAction(
  addressId: string,
  userId: string,
) {
  return entityAction(async () => {
    const parsedData = addUserToAddressSchema.parse({
      addressId,
      userId,
    });

    const { data } = await axiosSSR().post(
      `/userAddressAllow/${parsedData.addressId}`,
      {
        userId: parsedData.userId,
      },
    );

    revalidatePath(`/address/${parsedData.addressId}`);

    revalidatePath("/scan");

    return {
      message: data.message,
    };
  });
}
