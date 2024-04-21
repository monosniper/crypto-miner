import { useGetConfigurationQuery } from "@/redux/api/serversApi";
import { ConfiguratorField } from "@/types";
import { useEffect, useState } from "react";

export const useConfigurator = () => {
  const { data } = useGetConfigurationQuery(null);

  const [base, setBase] = useState<ConfiguratorField[]>();

  useEffect(() => {
    if (!data) return;

    const baseList = data.data.find((el) => el.slug === "base");

    setBase(baseList?.fields);
  }, [data]);

  return { base };
};
