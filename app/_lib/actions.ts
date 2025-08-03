"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import {
  createBookingApi,
  deleteBookingById,
  updateBooking,
  updateGuest,
} from "./data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GuestType } from "../types/guest";
import { CabinType } from "../types/cabin";

type UpdateGuestData = {
  fullName: string;
  nationality: string;
  countryFlag: string;
  nationalID: string;
};

type BookingDataType = {
  startDate?: Date;
  endDate?: Date;
  numNights: number;
  cabinPrice: number;
  cabin: string;
};

export type CreateBookingDto = {
  guest: GuestType | string;
  startDate?: string;
  endDate?: string;
  numNights: number;
  numGuests: number;
  observations: string;
  extrasPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isBreakfast: boolean;
  status: "unconfirmed" | "checked-out" | "checked-in";
  cabin: CabinType | string;
};

type UpdateReservationDataType = {
  numGuests: number;
  observations: string;
};

export async function updateProfile(formData: FormData) {
  const session = await auth();
  const guestId = session?.user?.guestId;

  if (!session) throw new Error("You are not logged in. Please log in first!");

  const nationalID = formData.get("nationalID") as string;
  const fullName = formData.get("fullName") as string;
  const [nationality, countryFlag] = (
    formData.get("nationality") as string
  )?.split("%");

  const updateData: UpdateGuestData = {
    fullName,
    nationality,
    countryFlag,
    nationalID,
  };

  await updateGuest(guestId, updateData);

  revalidatePath("/account/profile");
}

export async function singInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function createBooking(
  bookingData: BookingDataType,
  formData: FormData
) {
  const session = await auth();

  if (!session) throw new Error("You are not logged in. Please log in first!");
  const newBooking: CreateBookingDto = {
    ...bookingData,
    startDate: bookingData?.startDate?.toISOString(),
    endDate: bookingData?.endDate?.toISOString(),
    guest: session?.user.guestId,
    numGuests: +(formData.get("numGuests") ?? 0),
    observations: ((formData.get("observations") ?? "") as string).slice(
      0,
      1000
    ),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    isBreakfast: false,
    status: "unconfirmed",
  };
  createBookingApi(newBooking);
  revalidatePath(`/cabins/${bookingData.cabin}`);
  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId: string) {
  const session = await auth();

  if (!session) throw new Error("You are not logged in. Please log in first!");

  deleteBookingById(bookingId);

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData: FormData) {
  const session = await auth();

  if (!session) throw new Error("You are not logged in. Please log in first!");

  const bookingId = formData.get("bookingId") as string;
  const numGuests = (formData.get("numGuests") ?? 0) as number;
  const observations = (formData.get("observations") ?? "") as string;

  const updateData: UpdateReservationDataType = { numGuests, observations };

  updateBooking(bookingId, updateData);

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations");
}
