import cn from "clsx";
import styles from "./BalanceBlock.module.css";
import { AddIcon, ExportIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { useAppSelector } from "@/redux/store";
import { user } from "@/redux/slices/userSlice";

export const BalanceBlock = () => {
  const { userData } = useAppSelector(user);

  return (
    <div className={cn("box", styles.wrapper)}>
      <div className={styles.header}>
        <h4>Общий баланс</h4>
      </div>

      <div className={styles.content}>
        <div className={styles.balance}>
          <p className={styles.currentBalance}>
            <span>~</span>${userData?.wallet?.balance.USDT || 0}
          </p>

          {/* <p className={styles.changeBalance}>
            <span>0.62%</span>
            <ArrTopIcon />
          </p> */}
        </div>

        <div className={styles.contentBtns}>
          <Button icon={<AddIcon />} title="Пополнить" />
          <Button icon={<ExportIcon />} title="Вывести" color="primary" />
        </div>
      </div>
    </div>
  );
};
