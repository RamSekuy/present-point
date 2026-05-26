import { TUser } from "./user.model";

export type TCuty = {
  id: string;
  user: TUser;
  startDate: Date;
  endDate: Date;
  status: "Pending" | "Confirmed" | "Rejected";
  createdAt: Date;
  updatedAt: Date;
};
