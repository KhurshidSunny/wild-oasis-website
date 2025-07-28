import { getCabins } from "@/app/_lib/data-service";
import CabinCard from "@/app/_components/CabinCard";
import { CabinType } from "@/app/types/cabin";
// import { unstable_noStore as noStore } from "next/cache";

async function CabinList() {
  // stop caching in this component
  // noStore();
  const cabins: CabinType[] = await getCabins();

  if (cabins.length === 0) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin._id} />
      ))}
    </div>
  );
}
export default CabinList;
