import { Attention, Configurator, ConfiguratorServers } from "@/components";
import { useTranslation } from "react-i18next";
import cn from "clsx";
import { Button } from "@/components/ui";
import { Dispatch, SetStateAction, useState } from "react";

export const ConfiguratorPage = () => {
  const [isOpenAttention, setOpenAttention] = useState(true);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
        <div className="col-span-2 flex flex-col gap-2.5">
          {isOpenAttention && (
            <Attention
              content={<AttentionContent setOpen={setOpenAttention} />}
            />
          )}

          <div>
            <ConfiguratorServers />
          </div>

          <Configurator />
        </div>

        <div
          className={cn(
            "box",
            "col-span-1 py-4 px-3.5 flex flex-col gap-4 h-max",
          )}
        >
          <h3 className="text-base font-semibold">Кастомный сервер</h3>

          <div className="flex flex-col gap-1.5">
            <div
              className={cn(
                "box",
                "py-3 px-3.5 flex flex-col gap-2.5 !bg-base-400",
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-lg font-medium">Базовые настройки</h4>

                <p className="text-xs">$60.00</p>
              </div>

              <div className="flex flex-col gap-1.5 text-base-content-300">
                <p>Локация: United Kingdom</p>
                <p>CPU: I9-9999 KF</p>
                <p>RAM: I9-9999 KF</p>
                <p>RAM: I9-9999 KF</p>
                <p>RAM: I9-9999 KF</p>
                <p>RAM: I9-9999 KF</p>
              </div>
            </div>

            <div
              className={cn(
                "box",
                "py-3 px-3.5 flex flex-col gap-2.5 !bg-base-400",
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-lg font-medium">Базовые настройки</h4>

                <p className="text-xs">$60.00</p>
              </div>

              <div className="flex flex-col gap-1.5 text-base-content-300">
                <p>Локация: United Kingdom</p>
                <p>CPU: I9-9999 KF</p>
                <p>RAM: I9-9999 KF</p>
                <p>RAM: I9-9999 KF</p>
                <p>RAM: I9-9999 KF</p>
                <p>RAM: I9-9999 KF</p>
              </div>
            </div>

            <div
              className={cn(
                "box",
                "py-3 px-3.5 flex justify-between items-center gap-4 !bg-base-400",
              )}
            >
              <h4 className="text-sm font-medium">Цена:</h4>

              <p className="text-xs font-bold">$120.00</p>
            </div>
          </div>

          <Button
            className="w-full mt-4 rounded-lg text-sm"
            title="Перейти к оплате"
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

const AttentionContent = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();

  const close = () => {
    setOpen(false);
  };

  return (
    <div className="p-2 pb-4">
      <div className="cursor-pointer w-max ml-auto">
        <svg
          onClick={close}
          className="[&>path]:stroke-base-content-100"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 8L16 16"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 8L8 16"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className="text-center lg:text-sm">
        {t(
          "servers of the same plan can be launched simultaneously, this will give a multiple boost to the farm",
        )}
      </p>
    </div>
  );
};
