import { Swiper, SwiperSlide } from "swiper/react";
import { ConfiguratorServerItem } from "../ConfiguratorServerItem/ConfiguratorServerItem";
import { useGetPresetsQuery } from "@/redux/api/serversApi";

export const ConfiguratorServers = () => {
  const { data } = useGetPresetsQuery(null);

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
      {data?.data.map((preset, idx) => (
        <SwiperSlide key={idx} className="!h-auto">
          <ConfiguratorServerItem
            type={preset.title}
            price={preset.price}
            textList={[preset.configuration.location]}
            coins={preset.configuration.coins}
            configuration={preset.configuration}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
