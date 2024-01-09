import { BalanceBlock, History, MyCoins, Title } from "@/components";
import { useLoading } from "@/hooks";
import { useGetWalletQuery } from "@/redux/api/userApi";
import {
  main,
  setGoToBlock,
  setShowZeroMyCoins,
} from "@/redux/slices/mainSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useTranslation } from "react-i18next";
import { useRef, useEffect } from "react";

export const WalletPage = () => {
  const {
    data: walletData,
    isLoading: walletIsLoading,
    isFetching: walletIsFetching,
  } = useGetWalletQuery(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const walletLoading = useLoading(walletIsLoading, walletIsFetching);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { showZeroMyCoins, goToBlock } = useAppSelector(main);

  useEffect(() => {
    if (goToBlock === "history" && historyRef.current) {
      historyRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      dispatch(setGoToBlock(undefined));
    }
  }, [goToBlock, historyRef, dispatch]);

  return (
    <div>
      <Title className="flex lg:hidden pb-6" title={t("wallet")} />

      <BalanceBlock title={`${t("balance")}`} />

      <div className="mt-16">
        <div className="flex items-center justify-between gap-4">
          <Title title={t("my-coins")} />

          <div className="flex items-center gap-5 flex-wrap justify-start mb-4">
            <button
              className="py-2.5 px-4 rounded-full border border-base-border-100 bg-base-200 text-sm leading-none text-base-content-100 border-solid"
              onClick={() => dispatch(setShowZeroMyCoins(!showZeroMyCoins))}
            >
              {showZeroMyCoins ? t("hide zero coins") : t("show zero coins")}
            </button>
          </div>
        </div>

        <MyCoins
          className="mt-6"
          coinsList={walletData?.data}
          loading={walletLoading}
        />
      </div>

      <div className="mt-16" ref={historyRef}>
        <Title title={t("history")} />

        <History />
      </div>
    </div>
  );
};
