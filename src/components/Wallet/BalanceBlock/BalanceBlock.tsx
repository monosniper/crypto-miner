import cn from "clsx";
import styles from "./BalanceBlock.module.css";
import { AddIcon, ConverIcon, ExportIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { useGetWalletQuery } from "@/redux/api/userApi";
import { useLoading } from "@/hooks";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/redux/store";
import { user } from "@/redux/slices/userSlice";

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
  const { totalBalanceUSD } = useAppSelector(user);

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
              {walletData && type === "withdrawal" && (
                <p className={styles.currentBalance}>
                  {walletData.data.balance.USDT || 0} USDT
                </p>
              )}

              {walletData && type === "wallet" && (
                <p className={styles.currentBalance}>
                  ${totalBalanceUSD.toFixed(2)}
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
            <Button
              icon={<AddIcon />}
              title={t("deposit")}
              onClick={() => navigate("/wallet/replenishment")}
            />
            <Button
              icon={<ConverIcon className="[&>path]:fill-base-content-300" />}
              title={t("conversion")}
              onClick={() => navigate("/converter")}
            />
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
