import Spinner from "../_components/Spinner";

function loading() {
  return (
    <div className="grid justify-center items-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading Cabins data...</p>
    </div>
  );
}
export default loading;
