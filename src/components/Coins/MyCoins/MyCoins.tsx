import { FC, useState, useEffect } from "react";
import { MyCoin, PropsWithClassName } from "@/types";
import cn from "clsx";
import { Buy } from "@/components/ui";
import { CoinBlock, CoinSkelet } from "@/components";
import { useAppSelector } from "@/redux/store";
import { user } from "@/redux/slices/userSlice";
import { useGetCoinsQuery } from "@/redux/api/coinsApi";
import { useLoading } from "@/hooks";

export const MyCoins: FC<PropsWithClassName> = ({ className }) => {
  const { userData } = useAppSelector(user);
  const [coins, setCoins] = useState<MyCoin[]>([]);
  const {
    data: allCoins,
    isLoading: allCoinsIsLoading,
    isFetching: allCoinsIsFetching,
  } = useGetCoinsQuery(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData?.wallet) return;

    const walletCoins: (string | number)[][] = Object.entries(
      userData.wallet.balance,
    );

    const upgradeWalletCoins: MyCoin[] = [];

    if (allCoins) {
      for (let i = 0; i < allCoins.length; i++) {
        const coin: MyCoin = {
          id: 0,
          slug: "",
          name: "",
          balance: 0,
          icon_url: "",
        };

        for (let j = 0; j < walletCoins.length; j++) {
          if (allCoins[i].slug === walletCoins[j][0]) {
            coin.id = allCoins[i].id;
            coin.slug = walletCoins[j][0].toString();
            coin.balance = Number(walletCoins[j][1]);
            coin.name = allCoins[i].name;
            coin.icon_url = allCoins[i].icon_url;
          }
        }

        upgradeWalletCoins.push(coin);
      }
    }

    setCoins(upgradeWalletCoins);

    setLoading(false);
  }, [userData, allCoins]);

  const loading = useLoading(
    allCoinsIsLoading || isLoading,
    allCoinsIsFetching,
  );

  return (
    <div className={cn(className, "flex flex-wrap -m-2")}>
      <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-2">
        <Buy title="Купить монеты" onClick={() => console.log("click")} />
      </div>

      {loading ? (
        <>
          <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-2">
            <CoinSkelet />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-2">
            <CoinSkelet />
          </div>
        </>
      ) : (
        <>
          {coins.length > 0 &&
            coins
              .filter((el) => {
                return el.balance > 0;
              })
              .map((el) => {
                return (
                  <div
                    key={el.id}
                    className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-2"
                  >
                    <CoinBlock type="my" data={el} />
                  </div>
                );
              })}
        </>
      )}
    </div>
  );
};
