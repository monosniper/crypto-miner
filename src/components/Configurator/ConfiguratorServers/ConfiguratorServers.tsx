import { Swiper, SwiperSlide } from "swiper/react";
import { ConfiguratorServerItem } from "../ConfiguratorServerItem/ConfiguratorServerItem";
import { useGetPresetsQuery } from "@/redux/api/serversApi";
import { useTranslation } from "react-i18next";

export const ConfiguratorServers = () => {
  const { data } = useGetPresetsQuery(null);
  const { t } = useTranslation();

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
      {data?.data.map((preset) => (
        <SwiperSlide className="!h-auto">
          <ConfiguratorServerItem
            type={preset.title}
            price={preset.price}
            textList={[preset.configuration.location]}
            coins={preset.configuration.coins}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
