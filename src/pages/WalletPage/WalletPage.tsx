import { BalanceBlock, MyCoins, Title } from "@/components";

export const WalletPage = () => {
  return (
    <div>
      <Title className="flex lg:hidden pb-6" title="Кошелёк" />

      <BalanceBlock title="Общий баланс" />

      <div className="mt-16">
        <Title title="Мои монеты" />

        <MyCoins className="mt-6" />
      </div>
    </div>
  );
};
