import { BalanceBlock, History, MyCoins, Title } from "@/components";
import { useLoading } from "@/hooks";
import { useGetWalletQuery } from "@/redux/api/userApi";
import { useTranslation } from "react-i18next";

export const WalletPage = () => {
  const {
    data: walletData,
    isLoading: walletIsLoading,
    isFetching: walletIsFetching,
  } = useGetWalletQuery(null);

  const walletLoading = useLoading(walletIsLoading, walletIsFetching);
  const { t } = useTranslation();

  return (
    <div>
      <Title className="flex lg:hidden pb-6" title={t("wallet")} />

      <BalanceBlock title={`${t("balance")} USDT`} />

      <div className="mt-16">
        <Title title={t("my-coins")} />

        <MyCoins
          className="mt-6"
          coinsList={walletData}
          loading={walletLoading}
        />
      </div>

      <div className="mt-16">
        <Title title={t("history")} />

        <History />
      </div>
    </div>
  );
};
