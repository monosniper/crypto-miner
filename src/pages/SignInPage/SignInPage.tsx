import { SignInForm } from "@/components";
import cn from "clsx";

export const SignInPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className={cn("box", "p-10 sm:p-14 mx-4")}>
        <h5 className="mx-auto w-max bg-gradient-3 bg-clip-text text-transparent text-[34px] leading-10 font-semibold font-droid">
          Hogyx
        </h5>

        <SignInForm className="mt-6" />
      </div>
    </div>
  );
};
