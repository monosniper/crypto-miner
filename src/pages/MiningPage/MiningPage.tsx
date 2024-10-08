import {
  Attention,
  CoinBlock,
  EmptyText,
  InfoModal,
  LogsBlocks,
  Servers,
  Title,
} from "@/components";
import { Button, Search } from "@/components/ui";
import { useLoading } from "@/hooks";
import { useMining } from "@/hooks/useMining";
import { useGetMyServersQuery } from "@/redux/api/serversApi";
import { mining } from "@/redux/slices/miningSlice";
import { setUserData, user } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NamesModals } from "@/types";
import { setOpenModal } from "@/redux/slices/modalsOpensSlice";
import moment from "moment";
import { setText, setTitle } from "@/redux/slices/infoModalSlice";
import { useGetMeDataQuery } from "@/redux/api/userApi";

export const MiningPage = () => {
  const {
    data: serversList,
    isLoading: serversListIsLoading,
    isFetching: serversListIsFetching,
  } = useGetMyServersQuery(null);

  const serversListLoading = useLoading(
    serversListIsLoading,
    serversListIsFetching
  );
  const { t } = useTranslation();
  const {
    sessionData,
    sessionIsLoading,
    coins,
    toggleCoinSelection,
    startMiner,
    serversAllLogs,
    serversAllFounds,
    sessionMinerLogs,
    sessionServersLogs,
  } = useMining();
  const { selectedServers, selectedCoins } = useAppSelector(mining);
  const [searchValue, setSearchValue] = useState("");
  const { userData } = useAppSelector(user);
  const dispatch = useAppDispatch();
  const { data: userDataApi } = useGetMeDataQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!userDataApi) return;

    dispatch(setUserData(userDataApi.data));

    if (!userDataApi.data.session) {
      localStorage.removeItem("opened-info-mining-modal");
    }
  }, [dispatch, userData?.session, userDataApi]);

  useEffect(() => {
    if (!sessionData?.data || localStorage.getItem("opened-info-mining-modal"))
      return;

    dispatch(
      setOpenModal({
        stateNameModal: NamesModals.isOpenInfoModal,
        isOpen: true,
      })
    );

    dispatch(setTitle(t("attention") + "!"));
    dispatch(
      setText(
        t(
          "servers of the same plan can be launched simultaneously, this will give a multiple boost to the farm"
        )
      )
    );

    localStorage.setItem("opened-info-mining-modal", JSON.stringify(true));
  }, [dispatch, sessionData, t]);

  return (
    <>
      <div className="flex flex-col flex-grow">
        <Title className="flex lg:hidden pb-6" title={t("mining")} />

        <Attention
          className="p-6"
          title={t("pay-attention")}
          content={<AttentionContent />}
        />

        <div className="mt-16">
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

          {(coins.length > 0 || userData?.session) && (
            <div className="mt-6">
              <div className="flex flex-wrap -m-2">
                {coins
                  .filter((el) => {
                    if (!searchValue || !el.name || !el.slug) return el;

                    return (
                      el.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                      el.slug.toLowerCase().includes(searchValue.toLowerCase())
                    );
                  })
                  .map((el) => {
                    const foundSelectedCoin = selectedCoins.find(
                      (item) => item === el.id
                    );
                    const inWork =
                      Boolean(foundSelectedCoin && sessionData?.data) || false;

                    return (
                      <div
                        key={el.id}
                        className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                      >
                        <CoinBlock
                          className="cursor-pointer"
                          data={el}
                          type="mining"
                          selected={
                            selectedCoins.find((coin) => el.id === coin)
                              ? true
                              : false
                          }
                          onClick={() => {
                            if (!sessionData?.data) {
                              toggleCoinSelection(el);
                            }
                          }}
                          inWork={inWork}
                        />
                      </div>
                    );
                  })}
              </div>

              <Button
                className="mx-auto mt-6 min-w-[150px]"
                title={
                  userData?.session || sessionData?.data
                    ? t("at work")
                    : !sessionIsLoading
                    ? t("start")
                    : t("loading")
                }
                color="primary"
                onClick={startMiner}
                disabled={
                  userData?.session || sessionData?.data
                    ? true
                    : sessionIsLoading
                }
              />
            </div>
          )}

          {coins.length === 0 &&
            selectedServers?.length === 0 &&
            !userData?.session && (
              <div className="flex flex-col flex-grow">
                <EmptyText text={t("select servers")} />
              </div>
            )}
        </div>

        {(coins.length > 0 || userData?.session) && (
          <div className="mt-16">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
              {((sessionData?.data && sessionData.data?.end_at) ||
                userData?.session) && (
                <p>
                  {t("Approximate end time of the session")}:{"  "}
                  <span className="text-purple-2">
                    {sessionData?.data &&
                      moment
                        .utc(sessionData.data.end_at)
                        .local()
                        .format("DD.MM.YYYY HH:mm")}
                  </span>
                </p>
              )}

              {sessionData && sessionData.data?.end_at && (
                <p className="text-gray-1">
                  {t(
                    "the server is mining. After the time expires, the money will be credited to the wallet section"
                  )}
                </p>
              )}
            </div>

            <LogsBlocks
              left={serversAllLogs}
              right={serversAllFounds}
              leftTwo={sessionMinerLogs}
              rightTwo={sessionServersLogs}
            />
          </div>
        )}
      </div>

      <InfoModal />
    </>
  );
};

const AttentionContent = () => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <p>
          {t(
            "servers of the same plan can be launched simultaneously, this will give a multiple boost to the farm"
          )}
        </p>
      </div>
    </>
  );
};
