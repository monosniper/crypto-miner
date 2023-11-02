import { FC, useState, useEffect } from "react";
import { Balance, Coin, PropsWithClassName } from "@/types";
import cn from "clsx";
import { Buy, ShowMoreBtn } from "@/components/ui";
import { CoinBlock, CoinSkelet } from "@/components";
import { useGetCoinsQuery } from "@/redux/api/coinsApi";
import { useLoading } from "@/hooks";
import { useNavigate } from "react-router-dom";

type Props = {
  coinsList?: { balance: Balance };
  loading?: boolean;
};

export const MyCoins: FC<PropsWithClassName<Props>> = ({
  className,
  coinsList,
  loading = false,
}) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const {
    data: allCoins,
    isLoading: allCoinsIsLoading,
    isFetching: allCoinsIsFetching,
  } = useGetCoinsQuery(null);
  const [isLoading, setLoading] = useState(true);
  const [isMore, setMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!coinsList) return;

    const walletCoins: (string | number)[][] = Object.entries(
      coinsList.balance,
    );

    const upgradeWalletCoins: Coin[] = [];

    if (allCoins) {
      for (let i = 0; i < allCoins.length; i++) {
        const coin: Coin = {
          id: 0,
          slug: "",
          name: "",
          balance: 0,
          icon_url: "",
          rate: 0,
          change: 0,
          graph: [],
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
  }, [allCoins, coinsList]);

  const loadingCoins = useLoading(
    allCoinsIsLoading || loading || isLoading,
    allCoinsIsFetching,
  );

  return (
    <>
      <div className={cn(className, "flex flex-wrap -m-2")}>
        <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-2">
          <Buy title="Купить монеты" onClick={() => navigate("/trading")} />
        </div>

        {loadingCoins ? (
          <>
            <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-2">
              <CoinSkelet />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-2">
              <CoinSkelet />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-2">
              <CoinSkelet />
            </div>

            <div className="w-full xl:hidden sm:w-1/2 md:w-1/3 xl:w-1/4 p-2">
              <CoinSkelet />
            </div>
            <div className="w-full xl:hidden sm:w-1/2 md:w-1/3 xl:w-1/4 p-2">
              <CoinSkelet />
            </div>
          </>
        ) : (
          <>
            {coins.length > 0 &&
              coins
                .sort((a, b) => {
                  if (a.balance && b.balance) {
                    return b.balance - a.balance;
                  }

                  return 1;
                })
                .slice(0, isMore ? undefined : 8)
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

      {coins.length > 7 && (
        <ShowMoreBtn
          className="mt-6"
          onClick={() => setMore((prev) => !prev)}
          title={isMore ? "Свернуть" : "Показать больше"}
          isOpen={isMore}
        />
      )}
    </>
  );
};
