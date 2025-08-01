import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest Area",
};
export default async function Page() {
  const session = await auth();
  const username = session?.user?.name?.split(" ")[0];
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome {username}
      </h2>
    </div>
  );
}
