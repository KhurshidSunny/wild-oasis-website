import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "@/app/_components/DeleteReservation";
import Image from "next/image";
import { BookingType } from "../types/booking";
import Link from "next/link";

type ReservationCardProps = {
  booking: BookingType;
  onDelete: (bookingId: string) => Promise<void>;
};
export const formatDistanceFromNow = (dateStr: string | Date) =>
  formatDistance(
    typeof dateStr === "string" ? parseISO(dateStr) : dateStr,
    new Date(),
    {
      addSuffix: true,
    }
  ).replace("about ", "");

function ReservationCard({ booking, onDelete }: ReservationCardProps) {
  const {
    _id,
    createdAt,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    cabin: { name, image },
  } = booking;

  // Narrow types to avoid undefined
  const start = startDate ?? new Date(); // fallback to "now" if missing
  const end = endDate ?? start; // fallback to start if missing
  const created = createdAt ? new Date(createdAt) : new Date();

  return (
    <div className="flex border border-primary-800">
      <div className="relative h-32 aspect-square">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover border-r border-primary-800"
        />
      </div>

      <div className="flex-grow px-6 py-3 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(start)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="text-lg text-primary-300">
          {format(new Date(start), "EEE, MMM dd yyyy")} (
          {isToday(new Date(start)) ? "Today" : formatDistanceFromNow(start)})
          &mdash; {format(new Date(end), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex gap-5 mt-auto items-baseline">
          <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="ml-auto text-sm text-primary-400">
            Booked {format(new Date(created), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex flex-col border-l border-primary-800 w-[100px]">
        {!isPast(start) ? (
          <>
            {" "}
            <Link
              href={`/account/reservations/edit/${_id}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation bookingId={_id ?? ""} onDelete={onDelete} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ReservationCard;
