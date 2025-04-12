import { PasswordRecoveryForm } from "@/components";
import { LogoIcon } from "@/components/icons";
import cn from "clsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const PasswordRecoveryPage = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className={cn("box", "p-10 sm:p-14 mx-4")}>
        <h5 className="mx-auto w-max bg-gradient-3 bg-clip-text text-transparent text-[34px] leading-10 font-semibold font-droid flex items-center gap-2">
          <LogoIcon />
          Whales
        </h5>

        <PasswordRecoveryForm className="mt-6" />

        <Link
          className="mt-5 text-center flex justify-center text-base-content-100 hover:text-purple-3 transition"
          to="/auth/sign-in"
        >
          {t("sign-in")}
        </Link>
      </div>
    </div>
  );
};
