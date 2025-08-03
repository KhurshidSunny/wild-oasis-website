import { notFound } from "next/navigation";
import { api } from "../axios";
import { BookingType } from "../types/booking";
import { GuestType } from "../types/guest";
import { CreateBookingDto } from "./actions";

/////////////
// GET

export async function getCabin(id: string) {
  try {
    const response = await api.get(`/cabins/${id}`);
    return response.data.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(`Error: ${err.message}`);
    } else {
      console.log("An unknown error occurred", err);
    }
    notFound();
  }
}

export async function getCabins() {
  const response = await api.get("/cabins");
  return response.data.data;
}

// Guests are uniquely identified by their email address
export async function getGuest(email: string) {
  const response = await api.get(`/guests/guest_email/${email}`);
  return response.data.data[0];
}

export async function createGuest(newGuest: GuestType) {
  const response = await api.post("/guests", newGuest);
  return response.data;
}

export async function updateGuest(id: string, guestData: GuestType) {
  const response = await api.patch(`/guests/${id}`, guestData);
  return response.data;
}

export async function getBooking(bookingId: string) {
  const response = await api.get(`/bookings/${bookingId}`);
  return response.data.data;
}

export async function getBookings(guestId: string): Promise<BookingType[]> {
  const response = await api.get(`/bookings/guest/${guestId}`);
  return response.data.data;
}

export async function getBookedDatesByCabinId(cabinId: string) {
  const response = await api.get(`/bookings/cabin/${cabinId}/booked-dates`);
  return response.data.data;
}

export async function getSettings() {
  const response = await api.get("/settings");
  return response.data.data.settings[0];
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////

export async function createBookingApi(newBooking: CreateBookingDto) {
  const response = await api.post("/bookings", newBooking);
  return response.data.data;
}

/////////////
// UPDATE

type UpdateBookingParams = {
  numGuests: number;
  observations: string;
};
export async function updateBooking(
  id: string,
  updatedFields: UpdateBookingParams
) {
  await api.patch(`/bookings/${id}`, updatedFields);
}

/////////////
// DELETE

export async function deleteBookingById(bookingId: string) {
  await api.delete(`/bookings/${bookingId}`);
}
