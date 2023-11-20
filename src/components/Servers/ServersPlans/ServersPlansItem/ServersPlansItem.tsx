import { Button } from "@/components/ui";
import { PropsWithClassName, Server } from "@/types";
import cn from "clsx";
import { FC } from "react";
import styles from "./ServersPlansItem.module.css";
import { useTranslation } from "react-i18next";

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
                  <p>{el}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-auto pt-8 flex justify-center">
          <Button color="standart" title={t("buy")} />
        </div>
      </div>
    </div>
  );
};
