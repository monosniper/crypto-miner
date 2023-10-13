import { BalanceBlock, MyCoins, Title } from "@/components";
import { useLoading } from "@/hooks";
import { useGetWalletQuery } from "@/redux/api/userApi";

export const WalletPage = () => {
  const {
    data: walletData,
    isLoading: walletIsLoading,
    isFetching: walletIsFetching,
  } = useGetWalletQuery(null);

  const walletLoading = useLoading(walletIsLoading, walletIsFetching);

  return (
    <div>
      <Title className="flex lg:hidden pb-6" title="Кошелёк" />

      <BalanceBlock title="Баланс USDT" />

      <div className="mt-16">
        <Title title="Мои монеты" />

        <MyCoins
          className="mt-6"
          coinsList={walletData}
          loading={walletLoading}
        />
      </div>
    </div>
  );
};
