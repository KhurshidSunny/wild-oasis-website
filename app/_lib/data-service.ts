import { notFound } from "next/navigation";
import { api } from "../axios";
import { eachDayOfInterval } from "date-fns";

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

// export async function getCabinPrice(id) {
//   const { data, error } = await supabase
//     .from("cabins")
//     .select("regularPrice, discount")
//     .eq("id", id)
//     .single();

//   if (error) {
//     console.error(error);
//   }

//   return data;
// }

// Guests are uniquely identified by their email address
export async function getGuest(email) {
  const response = await api.get(`/guests/guest_email/${email}`);
  return response.data.data[0];
}

export async function createGuest(newGuest) {
  console.log(newGuest, "from guest create");
  const response = await api.post("/guests", newGuest);
  return response.data;
}

export async function updateGuest(id, guestData) {
  const response = await api.patch(`/guests/${id}`, guestData);
  return response.data;
}

export async function getBooking(id) {
  const response = await api.get(`/bookings/${id}`);
  return response.data.data;
}

export async function getBookings(guestId) {
  console.log(guestId);
  const response = await api.get(`/bookings/guest/${guestId}`);
  return response.data.data;
}

export async function getBookedDatesByCabinId(cabinId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const response = await api.get(`/bookings`);
  const data = response.data.data;

  const bookedDates = data
    ?.map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const response = await api.get("/settings");
  return response.data.data.settings;
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

// export async function createBooking(newBooking) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .insert([newBooking])
//     // So that the newly created object gets returned!
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be created");
//   }

//   return data;
// }

/////////////
// UPDATE

// // The updatedFields is an object which should ONLY contain the updated data
// export async function updateGuest(id, updatedFields) {
//   const { data, error } = await supabase
//     .from("guests")
//     .update(updatedFields)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Guest could not be updated");
//   }
//   return data;
// }

export async function updateBooking(id, updatedFields) {
  await api.patch(`/bookings/${id}`, updatedFields);
}

/////////////
// DELETE

export async function deleteBooking(id) {
  await api.delete(`/bookings/${id}`);
}
