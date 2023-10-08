import { BalanceBlock, MyCoins, Title } from "@/components";
import { ShowMoreBtn } from "@/components/ui";

export const WalletPage = () => {
  return (
    <div>
      <Title className="flex lg:hidden pb-6" title="Кошелёк" />

      <BalanceBlock />

      <div className="mt-16">
        <Title title="Мои монеты" />

        <MyCoins className="mt-6" />

        <ShowMoreBtn className="mt-6" onClick={() => console.log("click")} />
      </div>
    </div>
  );
};
