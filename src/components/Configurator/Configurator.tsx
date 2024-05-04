import cn from "clsx";
import { Select2 } from "../ui/Select2/Select2";
import { MainBadge } from "../ui";
import { useConfigurator } from "@/hooks";
import { FieldValues, UseFormReturn } from "react-hook-form";
import {
  AdditionalConfigurator,
  BaseConfigurator,
  Configuration,
  ConfiguratorFormData,
  NetworkConfigurator,
  OcConfigurator,
} from "@/types";
import { useGetCoinsQuery } from "@/redux/api/coinsApi";
import { Dispatch, SetStateAction } from "react";

type Props<T extends FieldValues> = {
  methods: UseFormReturn<T>;
  selectedCoins: number[];
  setSelectedCoins: Dispatch<SetStateAction<number[]>>;
};

export const Configurator = ({
  methods,
  selectedCoins,
  setSelectedCoins,
}: Props<ConfiguratorFormData>) => {
  const { configuration, base, oc, network, additional } = useConfigurator();
  const { data: coins } = useGetCoinsQuery(null);

  const selectCoin = (id: number) => {
    if (selectedCoins.find((coinId) => coinId === id)) {
      const coinsWithoutThisId = selectedCoins.filter(
        (coinId) => coinId !== id
      );

      setSelectedCoins(coinsWithoutThisId);
    } else {
      setSelectedCoins((prev) => [...prev, id]);
    }
  };

  const checkActiveCoin = (id: number) => {
    return Boolean(selectedCoins.find((coinId) => coinId === id));
  };

  return (
    <div className={cn("box", "p-8")}>
      <div className="flex flex-col gap-4 lg:gap-5">
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">
            Конфигурация выбранного сервера
          </h3>

          <div className="flex flex-col gap-1">
            {configuration?.map((el, idx) => {
              const list = el.options.map((option) => {
                return {
                  value: option.title,
                  title: option.title + " " + `(${option.price}$)`,
                };
              });

              methods.setValue(
                `configuration.${el.slug as keyof Configuration}`,
                list[0]?.value
              );

              return (
                <div
                  key={idx}
                  className="flex justify-between items-center gap-4 flex-wrap text-sm"
                >
                  <p>{el.slug}</p>

                  {el.type === "select" && (
                    <Select2
                      list={list}
                      onChange={(value) => {
                        methods.setValue(
                          `configuration.${el.slug as keyof Configuration}`,
                          value
                        );
                      }}
                    />
                  )}

                  {el.type === "text" && <p>Text</p>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">Операционная система</h3>

          <div className="flex flex-col gap-1">
            {oc?.map((el, idx) => {
              const list = el.options.map((option) => {
                return {
                  value: option.title,
                  title: option.title + " " + `(${option.price}$)`,
                };
              });

              methods.setValue(
                `oc.${el.slug as keyof OcConfigurator}`,
                list[0]?.value
              );

              return (
                <div
                  key={idx}
                  className="flex justify-between items-center gap-4 flex-wrap text-sm"
                >
                  <p>{el.slug}</p>

                  {el.type === "select" && (
                    <Select2
                      list={list}
                      onChange={(value) => {
                        methods.setValue(
                          `oc.${el.slug as keyof OcConfigurator}`,
                          value
                        );
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">Базовые настройки</h3>

          <div className="flex flex-col gap-1">
            {base?.map((el, idx) => {
              const list = el.options.map((option) => {
                return {
                  value: option.title,
                  title:
                    el.slug === "gpu_count"
                      ? option.title
                      : option.title + " " + `(${option.price}$)`,
                };
              });

              methods.setValue(
                `base.${el.slug as keyof BaseConfigurator}`,
                list[0]?.value
              );

              return (
                <div
                  key={idx}
                  className="flex justify-between items-center gap-4 flex-wrap text-sm"
                >
                  <p>{el.slug}</p>

                  {el.type === "select" && (
                    <Select2
                      list={list}
                      onChange={(value) => {
                        methods.setValue(
                          `base.${el.slug as keyof BaseConfigurator}`,
                          value
                        );
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">Сеть</h3>

          <div className="flex flex-col gap-1">
            {network?.map((el, idx) => {
              const list = el.options.map((option) => {
                return {
                  value: option.title,
                  title: option.title + " " + `(${option.price}$)`,
                };
              });

              methods.setValue(
                `network.${el.slug as keyof NetworkConfigurator}`,
                list[0]?.value
              );

              return (
                <div
                  key={idx}
                  className="flex justify-between items-center gap-4 flex-wrap text-sm"
                >
                  <p>{el.slug}</p>

                  {el.type === "select" && (
                    <Select2
                      list={list}
                      onChange={(value) => {
                        methods.setValue(
                          `network.${el.slug as keyof NetworkConfigurator}`,
                          value
                        );
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">Дополнительно</h3>

          <div className="flex flex-col gap-1">
            {additional?.map((el, idx) => {
              const list = el.options.map((option) => {
                return {
                  value: option.title,
                  title: option.title + " " + `(${option.price}$)`,
                };
              });

              methods.setValue(
                `additional.${el.slug as keyof AdditionalConfigurator}`,
                list[0]?.value
              );

              return (
                <div
                  key={idx}
                  className="flex justify-between items-center gap-4 flex-wrap text-sm"
                >
                  <p>{el.slug}</p>

                  {el.type === "select" && (
                    <Select2
                      list={list}
                      onChange={(value) => {
                        methods.setValue(
                          `additional.${
                            el.slug as keyof AdditionalConfigurator
                          }`,
                          value
                        );
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">Монеты</h3>

          <div className="flex items-center gap-1.5 flex-wrap">
            {coins?.data.map((coin) => (
              <MainBadge
                key={coin.id}
                title={coin.slug}
                onClick={() => selectCoin(coin.id)}
                active={checkActiveCoin(coin.id)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">Комментарий</h3>

          <div className="flex items-center gap-1.5 flex-wrap">
            <textarea
              className="bg-base-500 text-base min-h-[95px] rounded-lg w-full px-4 py-2"
              {...methods.register("comment")}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};
