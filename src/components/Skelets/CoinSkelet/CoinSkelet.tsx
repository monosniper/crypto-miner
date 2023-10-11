import { PropsWithClassName } from "@/types";
import styles from "./CoinSkelet.module.css";
import { FC } from "react";
import cn from "clsx";

export const CoinSkelet: FC<PropsWithClassName> = ({ className }) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <div className={styles.header}>
        <div className={styles.coinIconWrapper}></div>

        <p></p>
      </div>

      <div className={styles.chart}></div>

      <div className={styles.footer}>
        <p></p>
        <div className={cn(styles.changeCourse)}></div>
      </div>
    </div>
  );
};
