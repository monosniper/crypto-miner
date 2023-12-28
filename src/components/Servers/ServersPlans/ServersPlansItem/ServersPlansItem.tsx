import { Button } from "@/components/ui";
import { PropsWithClassName, Server } from "@/types";
import cn from "clsx";
import { FC, useEffect } from "react";
import styles from "./ServersPlansItem.module.css";
import { useTranslation } from "react-i18next";
import { useBuyServerMutation } from "@/redux/api/userApi";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/store";

type Props = {
  // icon: JSX.Element | string;
  // title: string;
  // price: number;

  // list: { icon: JSX.Element | string; text: string }[];

  data: Server;
};

export const ServersPlansItem: FC<PropsWithClassName<Props>> = ({
  className,
  data,
}) => {
  const { t } = useTranslation();
  const [buy, { data: buyServerData, error, isLoading }] =
    useBuyServerMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!buyServerData) return;

    if (!buyServerData.url || buyServerData.success === false) {
      toast.error(t("mistake"));
    }

    if (buyServerData.url) {
      document.location.href = buyServerData.url;
    }
  }, [buyServerData, dispatch, t]);

  useEffect(() => {
    if (!error) return;

    toast.error(t("mistake"));
  }, [error, t]);

  return (
    <div className={cn(className, "box", styles.wrapper)}>
      <div className={styles.inner}>
        <div>
          <div className={styles.titleBlock}>
            <img src={data.icon_url} alt="server-plan" />

            <h3>{data.title}</h3>

            <h4>${data.price}</h4>
          </div>

          <div className={styles.list}>
            {data.possibilities.map((el, idx) => {
              return (
                <div key={idx} className={styles.listItem}>
                  {el.icon_url && (
                    <img src={el.icon_url} alt="poss" width={20} height={20} />
                  )}

                  <p>{el.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-auto pt-8 flex justify-center">
          <Button
            color="standart"
            title={isLoading ? t("loading") : t("buy")}
            disabled={isLoading}
            onClick={() => {
              buy({ server_id: data.id });
            }}
          />
        </div>
      </div>
    </div>
  );
};
