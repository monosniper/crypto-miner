import { SignInForm } from "@/components";
import cn from "clsx";

export const SignInPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className={cn("box", "p-10 sm:p-14 mx-4")}>
        <img className="mx-auto" src="/images/logo.svg" alt="logo" />

        <SignInForm className="mt-6" />
      </div>
    </div>
  );
};
