import { MetamaskBtn, PersonalDataForm, Progress, Title } from "@/components";
import { useTranslation } from "react-i18next";
import cn from "clsx";
import { useAppSelector } from "@/redux/store";
import { user } from "@/redux/slices/userSlice";

export const ProfilePage = () => {
  const { t } = useTranslation();
  const { userData } = useAppSelector(user);

  return (
    <div>
      <Title className="flex lg:hidden pb-6" title={t("profile")} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <div className={cn("box", "p-6")}>
            <p className="text-lg font-medium">Hello, {userData?.name}! 😊</p>
          </div>

          <div className={cn("box", "p-6 flex flex-col gap-4")}>
            <h3 className="text-lg font-medium">
              Before receiving the PRO status
            </h3>

            <Progress />

            <div>
              <h4 className="text-sm font-medium">The Benefits of PRO:</h4>

              <div className="flex flex-col text-xs leading-[200%] text-base-content-200">
                <p>⚡ Faster withdraws within one hour</p>
                <p>❤️ Your personal manager</p>
                <p>✅ Automatic restart of mining</p>
                <p>⚡ Faster withdraws within one hour</p>
              </div>
            </div>
          </div>

          <div className={cn("box", "p-6 flex flex-col gap-4 text-sm")}>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <h4 className="text-lg font-medium">Connect Crypto-Wallet</h4>
              <MetamaskBtn />
            </div>

            <p className="text-base-content-300">
              With the Metamask wallet connected, withdrawals from the platform
              will be transferred faster and directly to the wallet without
              Hogyx commission
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className={cn("box", "p-6 flex flex-col gap-6")}>
            <h4 className="text-lg font-medium">Personal information</h4>

            <PersonalDataForm />
          </div>
        </div>
      </div>
    </div>
  );
};
