import cn from "clsx";
import styles from "./BalanceBlock.module.css";
import { AddIcon, ArrTopIcon, ExportIcon } from "@/components/icons";
import { Button } from "@/components/ui";

export const BalanceBlock = () => {
  return (
    <div className={cn("box", styles.wrapper)}>
      <div className={styles.header}>
        <h4>Общий баланс</h4>
      </div>

      <div className={styles.content}>
        <div className={styles.balance}>
          <p className={styles.currentBalance}>
            <span>~</span>$27,127.6
          </p>

          <p className={styles.changeBalance}>
            <span>0.62%</span>
            <ArrTopIcon />
          </p>
        </div>

        <div className={styles.contentBtns}>
          <Button icon={<AddIcon />} title="Пополнить" />
          <Button icon={<ExportIcon />} title="Вывести" color="primary" />
        </div>
      </div>
    </div>
  );
};
