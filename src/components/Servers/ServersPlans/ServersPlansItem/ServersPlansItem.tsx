import { Button, MainBadge } from "@/components/ui";
import { Preset, PropsWithClassName } from "@/types";
import cn from "clsx";
import { FC, useEffect } from "react";
import styles from "./ServersPlansItem.module.css";
import { useTranslation } from "react-i18next";
import { useSetOrderMutation } from "@/redux/api/userApi";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/store";
import { useGetCoinsQuery } from "@/redux/api/coinsApi";
import { useNavigate } from "react-router-dom";

type Props = {
  data: Preset;
};

export const ServersPlansItem: FC<PropsWithClassName<Props>> = ({
  className,
  data,
}) => {
  const { t } = useTranslation();
  const [buy, { data: buyServerData, error, isLoading }] =
    useSetOrderMutation();
  const { data: coins } = useGetCoinsQuery(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!buyServerData) return;

    navigate(
      `/wallet/payment/finish/with-crypto?price=${buyServerData.data.amount}&serverName=${data.title}&orderId=${buyServerData.data.purchase_id}`
    );
  }, [buyServerData, data.title, dispatch, navigate, t]);

  useEffect(() => {
    if (!error) return;

    toast.error(t("mistake"));
  }, [error, t]);

  return (
    <div className={cn(className, "box", styles.wrapper)}>
      <div className={styles.inner}>
        <div>
          <div className={styles.titleBlock}>
            {/* <img src={data.icon_url} alt="server-plan" /> */}

            <h3>{t(data.title)}</h3>

            <h4>${data.price}</h4>
          </div>

          <div className={styles.list}>
            {/* {data.possibilities.map((el, idx) => {
              return (
                <div key={idx} className={styles.listItem}>
                  {el.icon_url && (
                    <img src={el.icon_url} alt="poss" width={20} height={20} />
                  )}

                  <p>{t(el.name)}</p>
                </div>
              );
            })} */}

            <div className={styles.listItem}>{data.configuration.location}</div>

            <div className={styles.listItem}>
              {`${t("Notifications")}: ${
                data.configuration.notifications ? t("Yes") : t("No")
              }`}
            </div>

            <div className={styles.listItem}>{data.configuration.cpu}</div>

            <div className={styles.listItem}>
              {data.configuration.gpu + ` x${data.configuration.gpu_count}`}
            </div>

            <div className={styles.listItem}>{data.configuration.oc}</div>

            <div className={styles.listItem}>{data.configuration.ram}</div>

            {data.configuration.coins &&
              data.configuration.coins.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {data.configuration.coins.map((coinId) => {
                    const foundCoin = coins?.data.find(
                      (coin) => coin.id === Number(coinId)
                    );

                    if (!foundCoin) return;

                    return <MainBadge key={coinId} title={foundCoin.slug} />;
                  })}
                </div>
              )}
          </div>
        </div>

        <div className="mt-auto pt-8 flex justify-center">
          <Button
            color="standart"
            title={isLoading ? t("loading") : t("buy")}
            disabled={isLoading}
            onClick={() => {
              buy({
                type: "purchase",
                purchase_type: "server",
                purchase_id: data.id,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};
