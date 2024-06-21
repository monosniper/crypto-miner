import { Button } from "@/components/ui";
import { useConfiguratorPrice } from "@/hooks";
import { useGetCoinsQuery } from "@/redux/api/coinsApi";
import { ConfiguratorFormData } from "@/types";
import cn from "clsx";
import { FC } from "react";
import { Control, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

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
  const additional = useWatch({ control, name: "additional" });
  const { t } = useTranslation();

  const {
    basePrice,
    configurationPrice,
    ocPrice,
    networkPrice,
    additionalPrice,
    totalPrice,
  } = useConfiguratorPrice({ base, configuration, oc, network, additional, selectedCoins });

  return (
    <div
      className={cn("box", "col-span-1 py-4 px-3.5 flex flex-col gap-4 h-max")}
    >
      <h3 className="text-base font-semibold">{t("Custom server")}</h3>

      <div className="flex flex-col gap-1.5">
        <div
          className={cn(
            "box",
            "py-3 px-3.5 flex flex-col gap-2.5 !bg-base-400"
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <h4 className="text-lg font-medium">{t("Basic settings")}</h4>

            <p className="text-xs">
              ${(basePrice + configurationPrice + ocPrice).toFixed(2)}
            </p>
          </div>

          <div className="flex flex-col gap-1.5 text-base-content-300 leading-normal">
            {configuration &&
              Object.entries(configuration).map((el, idx) => (
                <p key={idx}>
                  {t(el[0])}: {el[1]}
                </p>
              ))}

            {oc &&
              Object.entries(oc).map((el, idx) => (
                <p key={idx}>
                  {t(el[0])}: {el[1]}
                </p>
              ))}

            {base &&
              Object.entries(base).map((el, idx) => (
                <p key={idx}>
                  {t(el[0])}: {el[1]}
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
            <h4 className="text-lg font-medium">{t("Network")}</h4>

            <p className="text-xs">${networkPrice.toFixed(2)}</p>
          </div>

          <div className="flex flex-col gap-1.5 text-base-content-300 leading-normal">
            {network &&
              Object.entries(network).map((el, idx) => (
                <p key={idx}>
                  {t(el[0])}: {el[1]}
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
            <h4 className="text-lg font-medium">{t("Additionally")}</h4>

            <p className="text-xs">${additionalPrice.toFixed(2)}</p>
          </div>

          <div className="flex flex-col gap-1.5 text-base-content-300 leading-normal">
            {additional &&
              Object.entries(additional).map((el, idx) => (
                <p key={idx}>
                  {t(el[0])}: {el[1]}
                </p>
              ))}

            {
              <p>
                {t("Coins")}:{" "}
                {selectedCoins
                  .map((coin) => {
                    if (!coins) return;

                    const foundCoin = coins.data.find((el) => el.id === coin);

                    return foundCoin?.slug;
                  })
                  .join(", ")}
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
          <h4 className="text-sm font-medium">{t("Price")}:</h4>

          <p className="text-xs font-bold">${totalPrice.toFixed(2)}</p>
        </div>
      </div>

      <Button
        className="w-full mt-4 rounded-lg text-sm"
        title={t("Proceed to payment")}
        color="primary"
        type="submit"
      />
    </div>
  );
};
