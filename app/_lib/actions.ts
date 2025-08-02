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

export async function updateProfile(formData) {
  const session = await auth();
  const guestId = session?.user?.guestId;

  if (!session) throw new Error("You are not logged in. Please log in first!");

  const nationalID = formData.get("nationalID");
  const fullName = formData.get("fullName");
  const [nationality, countryFlag] = formData.get("nationality")?.split("%");

  const updateData = { fullName, nationality, countryFlag, nationalID };

  await updateGuest(guestId, updateData);

  revalidatePath("/account/profile");
}

export async function singInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function createBooking(bookingData, formData) {
  const session = await auth();

  if (!session) throw new Error("You are not logged in. Please log in first!");
  const newBooking = {
    ...bookingData,
    guest: session?.user.guestId,
    numGuests: +formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
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

export async function deleteBooking(bookingId) {
  const session = await auth();

  if (!session) throw new Error("You are not logged in. Please log in first!");

  deleteBookingById(bookingId);

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const session = await auth();

  if (!session) throw new Error("You are not logged in. Please log in first!");

  const bookingId = formData.get("bookingId");
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");

  const updateData = { numGuests, observations };

  updateBooking(bookingId, updateData);

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations");
}
