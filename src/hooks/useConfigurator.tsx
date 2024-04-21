import { useGetConfigurationQuery } from "@/redux/api/serversApi";
import { ConfiguratorField } from "@/types";
import { useEffect, useState } from "react";

export const useConfigurator = () => {
  const { data } = useGetConfigurationQuery(null);

  const [configuration, setConfiguration] = useState<ConfiguratorField[]>();
  const [base, setBase] = useState<ConfiguratorField[]>();
  const [oc, setOc] = useState<ConfiguratorField[]>();
  const [network, setNetwork] = useState<ConfiguratorField[]>();
  const [additional, setAdditional] = useState<ConfiguratorField[]>();
  const [coins, setCoins] = useState<ConfiguratorField[]>();
  const [comment, setComment] = useState<ConfiguratorField[]>();

  useEffect(() => {
    if (!data) return;

    const configurationList = data.data.find(
      (el) => el.slug === "configuration.php",
    );
    const baseList = data.data.find((el) => el.slug === "base");
    const ocList = data.data.find((el) => el.slug === "oc");
    const networkList = data.data.find((el) => el.slug === "network");
    const additionalList = data.data.find((el) => el.slug === "additional");
    const coinsList = data.data.find((el) => el.slug === "coins");
    const commentItem = data.data.find((el) => el.slug === "comment");

    setConfiguration(configurationList?.fields);
    setBase(baseList?.fields);
    setOc(ocList?.fields);
    setNetwork(networkList?.fields);
    setAdditional(additionalList?.fields);
    setCoins(coinsList?.fields);
    setComment(commentItem?.fields);
  }, [data]);

  return { configuration, base, oc, network, additional, coins, comment };
};
