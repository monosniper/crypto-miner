import { FC } from "react";
import styles from "./ServersItem.module.css";
import cn from "clsx";
import { PropsWithClassName } from "@/types";
import { BurgerIcon, FanIcon } from "@/components/icons";

export const ServersItem: FC<PropsWithClassName> = ({ className }) => {
  return (
    <div className={cn(className, "box", styles.wrapper)}>
      <div className={styles.header}>
        <div className={styles.state}>
          <FanIcon />

          <p>Работает</p>
        </div>

        <div className={styles.menu}>
          <BurgerIcon />
        </div>
      </div>

      <h5 className={styles.title}>Antminer S19 XP 141</h5>
    </div>
  );
};
