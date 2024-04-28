import {
  Attention,
  Configurator,
  ConfiguratorAccount,
  ConfiguratorServers,
} from "@/components";
import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ConfiguratorFormData } from "@/types";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/store";
import { configurator } from "@/redux/slices/configurator.slice";
import { useSetOrderMutation } from "@/redux/api/userApi";
import { toast } from "react-toastify";

export const ConfiguratorPage = () => {
  const [isOpenAttention, setOpenAttention] = useState(true);
  const methods = useForm<ConfiguratorFormData>();
  const [selectedCoins, setSelectedCoins] = useState<number[]>([]);
  const navigate = useNavigate();
  const { price } = useAppSelector(configurator);
  const [setOrder, { error: newOrderError, isSuccess: newOrderIsSuccess }] =
    useSetOrderMutation();
  const { t } = useTranslation();

  useEffect(() => {
    if (!newOrderError) return;

    toast.error(t("mistake"));
  }, [newOrderError, t]);

  useEffect(() => {
    if (!newOrderIsSuccess) return;

    navigate(`/wallet/payment?price=${price}`);
  }, [navigate, newOrderIsSuccess, price]);

  const formHandler = (data: ConfiguratorFormData) => {
    const resData = {
      cpu: data.base.cpu,
      ram: data.base.ram,
      disk: data.base.disk,
      gpu: data.base.gpu,
      gpu_count: data.base.gpu_count,
      oc: data.oc.oc,
      type: data.configuration.type,
      location: data.configuration.location,
      notifications: data.additional.notifications,
      ipv: data.network.ipv,
      port: data.network.port,
      ip_count: data.network.ip_count,
      traffic: data.network.traffic,
    };

    setOrder({
      type: "purchase",
      purchase_type: "server",
      method: "crypto",
      configuration: resData as any,
    });
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

          <Configurator
            selectedCoins={selectedCoins}
            setSelectedCoins={setSelectedCoins}
            methods={methods}
          />
        </div>

        <ConfiguratorAccount
          selectedCoins={selectedCoins}
          control={methods.control}
        />
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
          "servers of the same plan can be launched simultaneously, this will give a multiple boost to the farm"
        )}
      </p>
    </div>
  );
};
