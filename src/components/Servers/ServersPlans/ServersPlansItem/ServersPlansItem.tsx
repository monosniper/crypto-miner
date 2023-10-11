import { Button } from "@/components/ui";
import { PropsWithClassName } from "@/types";
import cn from "clsx";
import { FC } from "react";
import styles from "./ServersPlansItem.module.css";

type Props = {
  icon: JSX.Element | string;
  title: string;
  price: number;

  list: { icon: JSX.Element | string; text: string }[];
};

export const ServersPlansItem: FC<PropsWithClassName<Props>> = ({
  className,
  icon = <></>,
  title = "",
  price = 0,
  list = [],
}) => {
  return (
    <div className={cn(className, "box", styles.wrapper)}>
      <div className={styles.inner}>
        <div>
          <div className={styles.titleBlock}>
            {typeof icon === "string" ? (
              <img src={icon} alt="server-plan" />
            ) : (
              icon
            )}

            <h3>{title}</h3>

            <h4>${price}</h4>
          </div>

          <div className={styles.list}>
            {list.map((el, idx) => {
              return (
                <div key={idx} className={styles.listItem}>
                  {el.icon === "string" ? (
                    <img src={el.icon} alt="server-plan" />
                  ) : (
                    el.icon
                  )}

                  <p>{el.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-auto pt-8 flex justify-center">
          <Button color="standart" title="Купить" />
        </div>
      </div>
    </div>
  );
};
