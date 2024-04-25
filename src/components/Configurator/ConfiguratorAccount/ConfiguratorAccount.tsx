import { Button, MainBadge } from "@/components/ui";
import { useConfiguratorPrice } from "@/hooks";
import { useGetCoinsQuery } from "@/redux/api/coinsApi";
import { ConfiguratorFormData } from "@/types";
import cn from "clsx";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Control, useWatch } from "react-hook-form";

type Props = {
  control: Control<ConfiguratorFormData, any>;
  selectedCoins: number[];
};

export const ConfiguratorAccount: FC<Props> = ({ control, selectedCoins }) => {
  const { data: coins } = useGetCoinsQuery(null);
  const base = useWatch({ control, name: "base" });
  const configuration = useWatch({ control, name: "configuration" });
  const oc = useWatch({ control, name: "oc" });
  const network = useWatch({ control, name: "network" });
  const comment = useWatch({ control, name: "comment" });
  const additional = useWatch({ control, name: "additional" });

  const {totalPrice} = useConfiguratorPrice({base, configuration, oc, network, additional})

  return (
    <div
      className={cn("box", "col-span-1 py-4 px-3.5 flex flex-col gap-4 h-max")}
    >
      <h3 className="text-base font-semibold">Кастомный сервер</h3>

      <div className="flex flex-col gap-1.5">
        <div
          className={cn(
            "box",
            "py-3 px-3.5 flex flex-col gap-2.5 !bg-base-400"
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <h4 className="text-lg font-medium">Базовые настройки</h4>

            <p className="text-xs">$60.00</p>
          </div>

          <div className="flex flex-col gap-1.5 text-base-content-300 leading-normal">
            {configuration &&
              Object.entries(configuration).map((el, idx) => (
                <p key={idx}>
                  {el[0]}: {el[1]}
                </p>
              ))}

            {oc &&
              Object.entries(oc).map((el, idx) => (
                <p key={idx}>
                  {el[0]}: {el[1]}
                </p>
              ))}

            {base &&
              Object.entries(base).map((el, idx) => (
                <p key={idx}>
                  {el[0]}: {el[1]}
                </p>
              ))}
          </div>
        </div>

        <div
          className={cn(
            "box",
            "py-3 px-3.5 flex flex-col gap-2.5 !bg-base-400"
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <h4 className="text-lg font-medium">Сеть</h4>

            <p className="text-xs">$60.00</p>
          </div>

          <div className="flex flex-col gap-1.5 text-base-content-300 leading-normal">
            {network &&
              Object.entries(network).map((el, idx) => (
                <p key={idx}>
                  {el[0]}: {el[1]}
                </p>
              ))}
          </div>
        </div>

        <div
          className={cn(
            "box",
            "py-3 px-3.5 flex flex-col gap-2.5 !bg-base-400"
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <h4 className="text-lg font-medium">Дополнительно</h4>

            <p className="text-xs">$60.00</p>
          </div>

          <div className="flex flex-col gap-1.5 text-base-content-300 leading-normal">
            {additional &&
              Object.entries(additional).map((el, idx) => (
                <p key={idx}>
                  {el[0]}: {el[1]}
                </p>
              ))}

            {
              <p>
                Coins:{" "}
                {selectedCoins.map((coin) => {
                  if (!coins) return;

                  const foundCoin = coins.data.find((el) => el.id === coin);

                  return foundCoin?.slug;
                }).join(", ")}
              </p>
            }
          </div>
        </div>

        <div
          className={cn(
            "box",
            "py-3 px-3.5 flex justify-between items-center gap-4 !bg-base-400"
          )}
        >
          <h4 className="text-sm font-medium">Цена:</h4>

          <p className="text-xs font-bold">$120.00</p>
        </div>
      </div>

      <Button
        className="w-full mt-4 rounded-lg text-sm"
        title="Перейти к оплате"
        color="primary"
        type="submit"
      />
    </div>
  );
};
