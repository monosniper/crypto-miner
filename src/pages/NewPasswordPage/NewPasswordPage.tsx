import { useTranslation } from "react-i18next";
import cn from "clsx";
import { LogoIcon } from "@/components/icons";
import { NewPasswordForm } from "@/components";
import { Link, useNavigate } from "react-router-dom";
import { useCheckPasswordCodeMutation } from "@/redux/api/userApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const NewPasswordPage = () => {
  const { t } = useTranslation();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const [checkPasswordCode, { data, error, isLoading }] =
    useCheckPasswordCodeMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!code) {
      toast.error(t("mistake"));

      return;
    }

    checkPasswordCode({ code });
  }, [checkPasswordCode, code, t]);

  useEffect(() => {
    if (!data || !data.success) {
      navigate("/auth/password-recovery");

      return;
    }
  }, [data, navigate]);

  useEffect(() => {
    if (!error) return;

    navigate("/auth/password-recovery");
  }, [error, navigate]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className={cn("box", "p-10 sm:p-14 mx-4")}>
        <h5 className="mx-auto w-max bg-gradient-3 bg-clip-text text-transparent text-[34px] leading-10 font-semibold font-droid flex items-center gap-2">
          <LogoIcon />
          Whales
        </h5>

        <NewPasswordForm
          code={code}
          disabled={!data || !data.success || error || isLoading ? true : false}
        />

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
