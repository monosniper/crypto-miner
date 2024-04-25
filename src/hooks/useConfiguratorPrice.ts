import {
  AdditionalConfigurator,
  BaseConfigurator,
  Configuration,
  NetworkConfigurator,
  OcConfigurator,
} from "@/types";
import { useEffect, useState } from "react";
import { useConfigurator } from "./useConfigurator";

type Args = {
  configuration: Configuration;
  base: BaseConfigurator;
  oc: OcConfigurator;
  network: NetworkConfigurator;
  additional: AdditionalConfigurator;
};

// data: Args = данные из react-hook-form

export const useConfiguratorPrice = (data: Args) => {
  const { configuration, base, oc, network, additional } = useConfigurator(); // Отфильтрованные данные из useGetConfigurationQuery

  const [basePrice, setBasePrice] = useState(0);
  const [configurationPrice, setConfigurationPrice] = useState(0);
  const [ocPrice, setOcPrice] = useState(0);
  const [networkPrice, setNetworkPrice] = useState(0);
  const [additionalPrice, setAdditionalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let configurationSum = 0;
    let baseSum = 0;
    let ocSum = 0;
    let networkSum = 0;
    let additionalSum = 0;

    Object.entries(data.configuration).forEach((el) => {
      const foundMoreData = configuration?.find(
        (confItem) => confItem.slug === el[0]
      );

      const foundOption = foundMoreData?.options.find(
        (option) => option.title === el[1]
      );

      if (!foundOption) return;

      configurationSum = foundOption.price;
    });

    Object.entries(data.base).forEach((el) => {
      const foundMoreData = base?.find((confItem) => confItem.slug === el[0]);

      const foundOption = foundMoreData?.options.find(
        (option) => option.title === el[1]
      );

      if (!foundOption) return;

      baseSum = foundOption.price;
    });

    Object.entries(data.oc).forEach((el) => {
      const foundMoreData = oc?.find((confItem) => confItem.slug === el[0]);

      const foundOption = foundMoreData?.options.find(
        (option) => option.title === el[1]
      );

      if (!foundOption) return;

      ocSum = foundOption.price;
    });

    Object.entries(data.network).forEach((el) => {
      const foundMoreData = network?.find((confItem) => confItem.slug === el[0]);

      const foundOption = foundMoreData?.options.find(
        (option) => option.title === el[1]
      );

      if (!foundOption) return;

      networkSum = foundOption.price;
    });

    Object.entries(data.additional).forEach((el) => {
      const foundMoreData = additional?.find(
        (confItem) => confItem.slug === el[0]
      );

      const foundOption = foundMoreData?.options.find(
        (option) => option.title === el[1]
      );

      if (!foundOption) return;

      additionalSum = foundOption.price;
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
    const sum = basePrice + configurationPrice + ocPrice + networkPrice;

    setTotalPrice(sum);
  }, [basePrice, configurationPrice, ocPrice, networkPrice]);

  return {
    basePrice,
    configurationPrice,
    ocPrice,
    networkPrice,
    additionalPrice,
    totalPrice,
  };
};
