import {
  AdditionalConfigurator,
  BaseConfigurator,
  Configuration,
  NetworkConfigurator,
  OcConfigurator,
} from "@/types";
import { useEffect, useState, useMemo } from "react";
import { useConfigurator } from "./useConfigurator";
import { setPrice } from "@/redux/slices/configurator.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { presets } from "@/redux/slices/presets.slice";
import { useGetSettingsQuery } from "@/redux/api/mainApi";

type Args = {
  configuration?: Configuration;
  base?: BaseConfigurator;
  oc?: OcConfigurator;
  network?: NetworkConfigurator;
  additional?: AdditionalConfigurator;
  selectedCoins: number[];
};

// data: Args = данные из react-hook-form

export const useConfiguratorPrice = (data: Args) => {
  const { configuration, base, oc, network, additional } = useConfigurator(); // Отфильтрованные данные из useGetConfigurationQuery
  const { price: presetPrice } = useAppSelector(presets);
  const { data: settings } = useGetSettingsQuery(null);

  const [basePrice, setBasePrice] = useState(0);
  const [configurationPrice, setConfigurationPrice] = useState(0);
  const [ocPrice, setOcPrice] = useState(0);
  const [networkPrice, setNetworkPrice] = useState(0);
  const [additionalPrice, setAdditionalPrice] = useState(0);
  const [coinsPrice, setCoinsPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useAppDispatch();

  const calculateSum = (data: Record<string, string>, configurator: any[]) => {
    return Object.entries(data).reduce((sum, [key, value]) => {
      const foundMoreData = configurator.find(
        (confItem) => confItem.slug === key
      );
      const foundOption = foundMoreData?.options.find(
        (option: any) => option.title === value
      );
      return sum + (foundOption?.price || 0);
    }, 0);
  };

  useEffect(() => {
    if (
      !configuration ||
      !base ||
      !oc ||
      !network ||
      !additional ||
      !data.base ||
      !data.configuration ||
      !data.additional ||
      !data.network ||
      !data.oc
    )
      return;

    setConfigurationPrice(calculateSum(data.configuration, configuration));
    setBasePrice(calculateSum(data.base, base));
    setOcPrice(calculateSum(data.oc, oc));
    setNetworkPrice(calculateSum(data.network, network));
    setAdditionalPrice(calculateSum(data.additional, additional));
  }, [base, configuration, oc, network, additional, data]);

  useEffect(() => {
    if (!settings) return;

    const sum = data.selectedCoins.reduce((acc, coinId) => {
      const coinPrice = Number(settings.coin_prices[coinId.toString()]);
      return acc + coinPrice;
    }, 0);

    setCoinsPrice(sum);
  }, [data.selectedCoins, settings]);

  useEffect(() => {
    const sum =
      basePrice +
      configurationPrice +
      ocPrice +
      networkPrice +
      additionalPrice +
      coinsPrice;
    setTotalPrice(sum);
    dispatch(setPrice(sum));
  }, [
    basePrice,
    configurationPrice,
    ocPrice,
    networkPrice,
    additionalPrice,
    coinsPrice,
    dispatch,
  ]);

  useEffect(() => {
    if (presetPrice !== undefined) {
      setTotalPrice(presetPrice);
    }
  }, [presetPrice]);

  return useMemo(
    () => ({
      basePrice,
      configurationPrice,
      ocPrice,
      networkPrice,
      additionalPrice,
      coinsPrice,
      totalPrice,
    }),
    [
      basePrice,
      configurationPrice,
      ocPrice,
      networkPrice,
      additionalPrice,
      coinsPrice,
      totalPrice,
    ]
  );
};
