import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";
import { CabinType } from "../types/cabin";

type cabinProps = {
  cabin: CabinType;
};

async function Reservation({ cabin }: cabinProps) {
  const session = await auth();
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin._id),
  ]);
  return (
    <div className="grid grid-cols-2 min-h-[400px] border border-primary-800">
      <DateSelector
        settings={settings}
        cabin={cabin}
        bookedDates={bookedDates}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session?.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
export default Reservation;
