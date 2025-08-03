"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import SubmitButton from "@/app/_components/SubmitButton";
import Image from "next/image";
import { CabinType } from "../types/cabin";

type User = {
  name: string;
  email: string;
  image: string;
  guestId: string;
};

type ReservationFormProps = {
  cabin: CabinType;
  user: User;
};

type BookingFormDataType = {
  startDate?: Date;
  endDate?: Date;
  numNights: number;
  cabinPrice: number;
  cabin: string;
};

function ReservationForm({ cabin, user }: ReservationFormProps) {
  const { range, resetRange } = useReservation();
  // CHANGE
  const { maxCapacity, regularPrice, discount, _id } = cabin;
  const startDate = range.from;
  const endDate = range.to;
  const numNights =
    endDate && startDate ? differenceInDays(endDate, startDate) : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData: BookingFormDataType = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabin: _id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center ">
          <div className="relative w-8 h-8">
            <Image
              // Important to display google profile images
              referrerPolicy="no-referrer"
              className="rounded-full"
              fill
              src={user.image}
              alt={user.name}
            />
          </div>
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve Now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
