import cn from "clsx";
import styles from "./BalanceBlock.module.css";
import { AddIcon, ExportIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { FC, useState, useEffect } from "react";
import { useGetWalletQuery, useGetWithdrawsQuery } from "@/redux/api/userApi";
import { useLoading } from "@/hooks";

type Props = {
  type?: "wallet" | "withdrawal";
  title: string;
};

export const BalanceBlock: FC<Props> = ({ title = "", type = "wallet" }) => {
  const navigate = useNavigate();
  const [outputSum, setOutputSum] = useState<number>();

  const {
    data: walletData,
    isLoading,
    isFetching,
  } = useGetWalletQuery(null, {
    skip: type === "withdrawal",
  });

  const {
    data: withdrawalData,
    isLoading: withdrawalIsLoading,
    isFetching: withdrawalIsFetching,
  } = useGetWithdrawsQuery(null);

  const walletLoading = useLoading(isLoading, isFetching);
  const withdrawalLoading = useLoading(
    withdrawalIsLoading,
    withdrawalIsFetching,
  );

  useEffect(() => {
    if (!withdrawalData) return;
    let sum = 0;

    for (let i = 0; i < withdrawalData.length; i++) {
      const item = withdrawalData[i];

      sum += item.amount;
    }

    setOutputSum(sum);
  }, [withdrawalData]);

  return (
    <div className={cn("box", styles.wrapper)}>
      <div className={styles.header}>
        <h4>{title}</h4>
      </div>

      <div className={styles.content}>
        <div className={styles.balance}>
          {type === "wallet" ? (
            <>
              {walletLoading ? (
                <div className="h-1 w-16 bg-base-300 rounded"></div>
              ) : (
                <>
                  {walletData && (
                    <p className={styles.currentBalance}>
                      {walletData.balance.USDT || 0} USDT
                    </p>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {withdrawalLoading ? (
                <div className="h-1 w-16 bg-base-300 rounded"></div>
              ) : (
                <>
                  {outputSum && (
                    <p className={styles.currentBalance}>
                      {outputSum || 0} USDT
                    </p>
                  )}
                </>
              )}
            </>
          )}

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
