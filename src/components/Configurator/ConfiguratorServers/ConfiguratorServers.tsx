import { Swiper, SwiperSlide } from "swiper/react";
import { ConfiguratorServerItem } from "../ConfiguratorServerItem/ConfiguratorServerItem";
import { useGetAllServersQuery } from "@/redux/api/serversApi";
import { useEffect, useState } from "react";
import { ServerPlan } from "@/types";
import { getSortedPlans } from "@/utils";
import { useTranslation } from "react-i18next";

export const ConfiguratorServers = () => {
  const { data } = useGetAllServersQuery(null);
  const { t } = useTranslation();

  const [sortedServers, setSortedServers] = useState<ServerPlan[]>([]);

  useEffect(() => {
    if (!data?.data) return;

    setSortedServers(getSortedPlans(data.data));
  }, [data]);

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1.5}
      breakpoints={{
        768: {
          slidesPerView: 2.5,
        },
      }}
    >
      {sortedServers.map((server) => (
        <SwiperSlide className="!h-auto">
          <ConfiguratorServerItem
            type={t(server.type as string)}
            price={server.price}
            textList={[]}
            coins={server.coins}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
