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
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { configurator } from "@/redux/slices/configurator.slice";
import { useSetOrderMutation } from "@/redux/api/userApi";
import { toast } from "react-toastify";
import { presets } from "@/redux/slices/presets.slice";

export const ConfiguratorPage = () => {
  const [isOpenAttention, setOpenAttention] = useState(true);
  const methods = useForm<ConfiguratorFormData>();
  const [selectedCoins, setSelectedCoins] = useState<number[]>([]);
  const navigate = useNavigate();
  const { price } = useAppSelector(configurator);
  const { configuration, name } = useAppSelector(presets);
  const [
    setOrder,
    { data: newOrder, error: newOrderError, isSuccess: newOrderIsSuccess },
  ] = useSetOrderMutation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!newOrderError) return;

    toast.error(t("mistake"));
  }, [newOrderError, t]);

  useEffect(() => {
    if (!newOrderIsSuccess || !newOrder) return;

    navigate(
      `/wallet/payment?price=${newOrder.data.amount}&orderId=${newOrder.data.id}`
    );
  }, [navigate, newOrder, newOrderIsSuccess, price]);

  const formHandler = (data: ConfiguratorFormData) => {
    if (selectedCoins.length === 0) {
      return toast.error("Выберите хотя бы 1 монету");
    }

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

      canFarmNft: data.additional.canFarmNft,
      comment: data.comment,

      coins: selectedCoins,
    };

    setOrder({
      configuration: resData as any,
    });
  };

  useEffect(() => {
    if (!configuration) return;

    methods.setValue("configuration.location", configuration.location);
    methods.setValue("configuration.type", name);

    methods.setValue("base.cpu", configuration.cpu);
    methods.setValue("base.disk", configuration.disk);
    methods.setValue("base.gpu", configuration.gpu);
    methods.setValue("base.gpu_count", configuration.gpu_count);
    methods.setValue("base.ram", configuration.ram);

    methods.setValue("oc.oc", configuration.oc);

    methods.setValue("network.ip_count", configuration.ip_count);
    methods.setValue("network.ipv", configuration.ipv);
    methods.setValue("network.port", configuration.port);
    methods.setValue("network.traffic", configuration.traffic);

    methods.setValue("additional.canFarmNft", configuration.canFarmNft);
    methods.setValue("additional.notifications", configuration.notifications);

    setSelectedCoins(configuration.coins.map((el) => Number(el)));
  }, [configuration, dispatch, methods, name]);

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
