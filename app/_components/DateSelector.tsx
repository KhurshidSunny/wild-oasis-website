"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";
import { RangeType } from "./ReservationContext";
import { CabinType } from "@/app/types/cabin";

export type BookedDates = Date[];

function isAlreadyBooked(range: RangeType, datesArr: BookedDates) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date: Date) =>
      isWithinInterval(date, {
        start: range.from as Date,
        end: range.to as Date,
      })
    )
  );
}
type SettingsType = {
  minBookingLength: number;
  maxBookingLength: number;
};

type DateSelectorPropsType = {
  settings: SettingsType;
  cabin: CabinType;
  bookedDates: Date[];
};

function DateSelector({ settings, cabin, bookedDates }: DateSelectorPropsType) {
  const { range, setRange, resetRange } = useReservation();

  const displayRange: DateRange | undefined = isAlreadyBooked(
    range,
    bookedDates
  )
    ? undefined
    : range;

  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(
    displayRange?.to as Date,
    displayRange?.from as Date
  );
  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        selected={displayRange}
        onSelect={(range: RangeType | undefined) =>
          setRange(range ?? { from: undefined, to: undefined })
        }
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={1}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates?.some((date: Date) => isSameDay(date, curDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
