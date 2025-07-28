import { getCabins } from "@/app/_lib/data-service";
import CabinCard from "@/app/_components/CabinCard";
import { CabinType } from "@/app/types/cabin";

type CabinListProps = {
  filter: string;
};

async function CabinList({ filter }: CabinListProps) {
  // stop caching in this component
  // noStore();
  const cabins: CabinType[] = await getCabins();

  let filteredCabins: CabinType[];
  if (filter === "all") filteredCabins = cabins;
  else if (filter === "small")
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  else if (filter === "medium")
    filteredCabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity <= 6
    );
  else if (filter === "large")
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity > 6);
  else filteredCabins = [];

  if (filteredCabins.length === 0) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin._id} />
      ))}
    </div>
  );
}
export default CabinList;
