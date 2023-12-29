import { FC, useState, useEffect } from "react";
import { Balance, Coin, PropsWithClassName } from "@/types";
import cn from "clsx";
import { ShowMoreBtn } from "@/components/ui";
import { CoinBlock, CoinSkelet } from "@/components";
import { useGetCoinsQuery } from "@/redux/api/coinsApi";
import { useLoading } from "@/hooks";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/redux/store";
import { main } from "@/redux/slices/mainSlice";

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
  const [maxItems, setMaxItems] = useState<number>();
  const { t } = useTranslation();
  const { showZeroMyCoins } = useAppSelector(main);

  useEffect(() => {
    const resizeListener = () => {
      if (
        (window.innerWidth >= 640 && window.innerWidth < 768) ||
        window.innerWidth >= 1280
      ) {
        setMaxItems(7);
      }

      if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        setMaxItems(8);
      }
    };

    resizeListener();

    window.addEventListener("resize", resizeListener);

    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  useEffect(() => {
    if (!coinsList) return;

    const walletCoins: (string | number)[][] = Object.entries(
      coinsList.balance,
    );

    const upgradeWalletCoins: Coin[] = [];

    if (allCoins) {
      for (let i = 0; i < allCoins.data.length; i++) {
        const coin: Coin = {
          id: 0,
          slug: "",
          name: "",
          balance: 0,
          icon_url: "",
          rate: 0,
          change: 0,
          graph: [],
          graph_today: [],
          money_balance: 0,
          hardLoad: 0,
        };

        for (let j = 0; j < walletCoins.length; j++) {
          if (allCoins.data[i].slug === walletCoins[j][0]) {
            coin.id = allCoins.data[i].id;
            coin.slug = walletCoins[j][0].toString();
            coin.balance = Number(walletCoins[j][1]);
            coin.name = allCoins.data[i].name;
            coin.icon_url = allCoins.data[i].icon_url;
            coin.rate = allCoins.data[i].rate;
            coin.money_balance = walletCoins[1][1] as unknown as number;
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
        {/* <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-2">
          <Buy title={t("buy-coins")} onClick={() => navigate("/trading")} />
        </div> */}

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
                .slice(0, isMore ? undefined : maxItems)
                .filter((el) => {
                  if (showZeroMyCoins) return el;

                  return el.balance !== 0;
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

      {maxItems && coins.length > maxItems - 1 && (
        <ShowMoreBtn
          className="mt-6"
          onClick={() => setMore((prev) => !prev)}
          title={isMore ? t("roll-up") : t("show-more")}
          isOpen={isMore}
        />
      )}
    </>
  );
};
