import { CoinBlock, EmptyText, Servers, Title } from "@/components";
import { Button, Search } from "@/components/ui";
import { useLoading } from "@/hooks";
import { useMining } from "@/hooks/useMining";
import { useGetMyServersQuery } from "@/redux/api/serversApi";
import { mining } from "@/redux/slices/miningSlice";
import { useAppSelector } from "@/redux/store";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const MiningPage = () => {
  const {
    data: serversList,
    isLoading: serversListIsLoading,
    isFetching: serversListIsFetching,
  } = useGetMyServersQuery(null);

  const serversListLoading = useLoading(
    serversListIsLoading,
    serversListIsFetching,
  );
  const { t } = useTranslation();
  const { coins, toggleCoinSelection, startMiner } = useMining();
  const { selectedServers, selectedCoins } = useAppSelector(mining);
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="flex flex-col flex-grow">
      <Title className="flex lg:hidden pb-6" title={t("mining")} />

      <div>
        <Title title={t("servers involved")} />

        <Servers
          className="mt-6"
          servers={serversList?.data}
          loading={serversListLoading}
          type="mining"
        />
      </div>

      <div className="mt-16 flex flex-col flex-grow">
        <Search
          placeholder={t("find a coin")}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {coins.length > 0 && (
          <div className="mt-6">
            <div className="flex flex-wrap -m-2">
              {coins
                .filter((el) => {
                  if (!searchValue || !el.name || !el.slug) return el;

                  return (
                    el.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                    el.slug.toLowerCase().includes(searchValue.toLowerCase())
                  );
                })
                .map((el) => {
                  return (
                    <div
                      key={el.id}
                      className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                    >
                      <CoinBlock
                        data={el}
                        type="mining"
                        selected={
                          selectedCoins.find((coin) => el.id === coin.id)
                            ? true
                            : false
                        }
                        onClick={() => toggleCoinSelection(el)}
                      />
                    </div>
                  );
                })}
            </div>

            <Button
              className="mx-auto mt-6 min-w-[150px]"
              title={t("start")}
              color="primary"
              onClick={startMiner}
            />
          </div>
        )}

        {coins.length === 0 && selectedServers.length === 0 && (
          <div className="flex flex-col flex-grow">
            <EmptyText text={t("select servers")} />
          </div>
        )}
      </div>
    </div>
  );
};
