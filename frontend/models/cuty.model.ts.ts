import { TUser } from "./user.model";

export type TCuty = {
  id: string;
  user: TUser;
  startDate: Date;
  endDate: Date;
  isConfirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
};
