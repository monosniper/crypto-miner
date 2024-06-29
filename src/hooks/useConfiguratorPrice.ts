import {
  AdditionalConfigurator,
  BaseConfigurator,
  Configuration,
  NetworkConfigurator,
  OcConfigurator,
} from "@/types";
import { useEffect, useState } from "react";
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

    let configurationSum = 0;
    let baseSum = 0;
    let ocSum = 0;
    let networkSum = 0;
    let additionalSum = 0;

    Object.entries(data.configuration).forEach((el) => {
      const foundMoreData = configuration.find(
        (confItem) => confItem.slug === el[0]
      );

      const foundOption = foundMoreData?.options.find(
        (option) => option.title === el[1]
      );

      if (!foundOption) return;

      configurationSum += foundOption.price;
    });

    Object.entries(data.base).forEach((el) => {
      const foundMoreData = base.find((confItem) => confItem.slug === el[0]);

      const foundOption = foundMoreData?.options.find(
        (option) => option.title === el[1]
      );

      if (!foundOption) return;

      if (el[0] === "gpu") {
        // Calculate GPU price based on gpu_count
        baseSum += foundOption.price * Number(data?.base?.gpu_count);
      } else {
        baseSum += foundOption.price;
      }
    });

    Object.entries(data.oc).forEach((el) => {
      const foundMoreData = oc.find((confItem) => confItem.slug === el[0]);

      const foundOption = foundMoreData?.options.find(
        (option) => option.title === el[1]
      );

      if (!foundOption) return;

      ocSum += foundOption.price;
    });

    Object.entries(data.network).forEach((el) => {
      const foundMoreData = network.find((confItem) => confItem.slug === el[0]);

      const foundOption = foundMoreData?.options.find(
        (option) => option.title === el[1]
      );

      if (!foundOption) return;

      networkSum += foundOption.price;
    });

    Object.entries(data.additional).forEach((el) => {
      const foundMoreData = additional.find(
        (confItem) => confItem.slug === el[0]
      );

      const foundOption = foundMoreData?.options.find(
        (option) => option.title === el[1]
      );

      if (!foundOption) return;

      additionalSum += foundOption.price;
    });

    setConfigurationPrice(configurationSum);
    setBasePrice(baseSum);
    setOcPrice(ocSum);
    setNetworkPrice(networkSum);
    setAdditionalPrice(additionalSum);
  }, [
    base,
    configuration,
    oc,
    network,
    additional,
    data.base,
    data.configuration,
    data.oc,
    data.network,
    data.additional,
  ]);

  useEffect(() => {
    let sum = 0;
  
    for (let i = 0; i < data.selectedCoins.length; i++) {
      const coinId = data.selectedCoins[i];
      const coinPrice = Number(settings?.coin_prices[coinId.toString()]);
      sum += coinPrice;
    }
  
    if (data.selectedCoins.length > 2) {
      sum *= 1.2; // Increase by 20% if more than two coins are selected
    }
  
    setCoinsPrice(sum);
  }, [data.selectedCoins, settings?.coin_prices]);
  

  useEffect(() => {
    const sum =
      basePrice + configurationPrice + ocPrice + networkPrice + coinsPrice;

    setTotalPrice(sum);
    dispatch(setPrice(sum));
  }, [
    basePrice,
    configurationPrice,
    ocPrice,
    networkPrice,
    dispatch,
    coinsPrice,
  ]);

  useEffect(() => {
    if (presetPrice === undefined) return;

    setTotalPrice(presetPrice);
  }, [presetPrice]);

  return {
    basePrice,
    configurationPrice,
    ocPrice,
    networkPrice,
    additionalPrice,
    coinsPrice,
    totalPrice,
  };
};
