import { getCabin, getCabins } from "@/app/_lib/data-service";
import { CabinType } from "@/app/types/cabin";
import Reservation from "@/app/_components/Reservation";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

type ParamsType = {
  params: {
    cabinId: string;
  };
};

type IdsType = {
  cabinId: string;
};

// setting the title of the page dynamically
export async function generateMetadata({ params }: ParamsType) {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}

// making this page as static from dynamic
export async function generateStaticParams() {
  const cabins: CabinType[] = await getCabins();
  const ids: IdsType[] = cabins.map((cabin) => {
    return { cabinId: cabin._id };
  });
  console.log(ids);
  return ids;
}
export default async function Page({ params }: ParamsType) {
  const cabin: CabinType = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
