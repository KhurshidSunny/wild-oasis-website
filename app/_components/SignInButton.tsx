import Image from "next/image";
import { singInAction } from "../_lib/actions";

function SignInButton() {
  return (
    <form action={singInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <div className="relative w-8 h-8">
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            fill
            className="object-cover"
          />
        </div>
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
