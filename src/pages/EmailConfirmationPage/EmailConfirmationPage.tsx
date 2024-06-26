import { user } from "@/redux/slices/userSlice";
import { useAppSelector } from "@/redux/store";
import { useTranslation } from "react-i18next";

export const EmailConfirmationPage = () => {
  const { userData } = useAppSelector(user);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center flex-col">
      <div className="box p-6 min-w-[500px]">
        <p className="text-2xl text-center font-semibold">
          {t("Confirm your email")}
        </p>

        <p className="text-center mt-6 text-xl">{userData?.email}</p>
      </div>
    </div>
  );
};
