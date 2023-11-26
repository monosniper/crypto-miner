import cn from "clsx";
import styles from "./BalanceBlock.module.css";
import { AddIcon, ExportIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { useGetWalletQuery } from "@/redux/api/userApi";
import { useLoading } from "@/hooks";
import { useTranslation } from "react-i18next";

type Props = {
  type?: "wallet" | "withdrawal";
  title: string;
};

export const BalanceBlock: FC<Props> = ({ title = "", type = "wallet" }) => {
  const navigate = useNavigate();

  const {
    data: walletData,
    isLoading,
    isFetching,
  } = useGetWalletQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  const walletLoading = useLoading(isLoading, isFetching);
  const { t } = useTranslation();

  return (
    <div className={cn("box", styles.wrapper)}>
      <div className={styles.header}>
        <h4>{title}</h4>
      </div>

      <div className={styles.content}>
        <div className={styles.balance}>
          {walletLoading ? (
            <div className="h-1 w-16 bg-base-300 rounded"></div>
          ) : (
            <>
              {walletData && (
                <p className={styles.currentBalance}>
                  {walletData.data.balance.USDT || 0} USDT
                </p>
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
            <Button icon={<AddIcon />} title={t("deposit")} />
            <Button
              icon={<ExportIcon />}
              title={t("withdraw")}
              color="primary"
              onClick={() => navigate("/wallet/withdrawal")}
            />
          </div>
        )}
      </div>
    </div>
  );
};
