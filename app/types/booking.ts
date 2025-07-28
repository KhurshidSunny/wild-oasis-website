import { CabinType } from "./cabin";
import { GuestType } from "./guest";

export type BookingType = {
  _id: string;
  guest: GuestType;
  startDate: string;
  endDate: Date;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  status: string;
  created_at: Date;
  cabin: CabinType;
};
