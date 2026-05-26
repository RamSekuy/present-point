import z from "zod";

const userAddressAllowSchema = z.object({
  userId: z.uuid(),
  addressId: z.uuid(),
});

export const deleteAddressSchema = z.object({
  id: z.uuid(),
});

export const removeUserFromAddressSchema = userAddressAllowSchema;

export const addUserToAddressSchema = userAddressAllowSchema;
