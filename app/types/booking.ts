import { CabinType } from "./cabin";
import { GuestType } from "./guest";

export type BookingType = {
  _id?: string;
  createdAt?: string;
  guest: GuestType | string;
  startDate?: Date;
  endDate?: Date;
  numNights: number;
  numGuests: number;
  observations: string;
  extrasPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isBreakfast: boolean;
  status: "unconfirmed" | "checked-out" | "checked-in";
  cabin: CabinType;
};
