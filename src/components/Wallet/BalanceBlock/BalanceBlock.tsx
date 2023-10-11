import cn from "clsx";
import styles from "./BalanceBlock.module.css";
import { AddIcon, ExportIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { useAppSelector } from "@/redux/store";
import { user } from "@/redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

type Props = {
  type?: "wallet" | "withdrawal";
  title: string;
};

export const BalanceBlock: FC<Props> = ({ title = "", type = "wallet" }) => {
  const { userData } = useAppSelector(user);
  const navigate = useNavigate();

  return (
    <div className={cn("box", styles.wrapper)}>
      <div className={styles.header}>
        <h4>{title}</h4>
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

        {type === "wallet" && (
          <div className={styles.contentBtns}>
            <Button icon={<AddIcon />} title="Пополнить" />
            <Button
              icon={<ExportIcon />}
              title="Вывести"
              color="primary"
              onClick={() => navigate("/wallet/withdrawal")}
            />
          </div>
        )}
      </div>
    </div>
  );
};
