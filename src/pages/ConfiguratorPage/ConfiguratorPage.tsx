import { Attention, Configurator, ConfiguratorAccount, ConfiguratorServers } from "@/components";
import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { ConfiguratorFormData } from "@/types";

export const ConfiguratorPage = () => {
  const [isOpenAttention, setOpenAttention] = useState(true);
  const methods = useForm<ConfiguratorFormData>();
  const [selectedCoins, setSelectedCoins] = useState<number[]>([]);
  
  const formHandler = (data: ConfiguratorFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={methods.handleSubmit(formHandler)}>
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

          <Configurator selectedCoins={selectedCoins} setSelectedCoins={setSelectedCoins} methods={methods} />
        </div>

          <ConfiguratorAccount selectedCoins={selectedCoins} control={methods.control} />
      </div>
    </form>
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
