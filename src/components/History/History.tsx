import { useState } from "react";
import { Button, TabButton } from "@/components/ui";
import {
  useGetConvertationsQuery,
  useGetOrdersQuery,
  useGetWithdrawsQuery,
} from "@/redux/api/userApi";
import { useLoading } from "@/hooks";
import {
  CoinSkelet,
  ConvertationsItem,
  EmptyText,
  ReplenishmentItem,
  WithdrawsItem,
} from "@/components";
import { useTranslation } from "react-i18next";
import { ReplenishmentItem as ReplenishmentItemTypes } from "@/types";

type Tabs = "deposits" | "convertations" | "withdraws";

export const History = () => {
  const [currentTab, setCurrentTab] = useState<Tabs>("convertations");
  const { t } = useTranslation();
  const [showMoreConvertations, setShowMoreConvertations] = useState(false);
  const [showMoreWithdraws, setShowMoreWithdraws] = useState(false);
  const [showMoreDeposits, setShowMoreDeposits] = useState(false);

  const {
    data: convertationsList,
    isLoading: convertationsIsLoading,
    isFetching: convertationsIsFetching,
  } = useGetConvertationsQuery(null, {
    skip: currentTab !== "convertations",
  });

  const {
    data: withdrawsList,
    isLoading: withdrawsIsLoading,
    isFetching: withdrawsIsFetching,
  } = useGetWithdrawsQuery(null, {
    skip: currentTab !== "withdraws",
  });

  const {
    data: replenishmentList,
    isLoading: replenishmentIsLoading,
    isFetching: replenishmentIsFetching,
  } = useGetOrdersQuery(null, {
    skip: currentTab !== "deposits",
  });

  const convertationsLoading = useLoading(
    convertationsIsLoading,
    convertationsIsFetching
  );

  const withdrawsLoading = useLoading(withdrawsIsLoading, withdrawsIsFetching);

  const replenishmentLoading = useLoading(
    replenishmentIsLoading,
    replenishmentIsFetching
  );

  return (
    <div>
      <div className="flex items-center -m-2 flex-wrap mt-6">
        <div className="p-2 w-full sm:w-1/3 md:w-max">
          <TabButton
            className="w-full"
            title={t("conversions")}
            selected={currentTab === "convertations"}
            onClick={() => setCurrentTab("convertations")}
          />
        </div>

        <div className="p-2 w-full sm:w-1/3 md:w-max">
          <TabButton
            className="w-full"
            title={t("Accounts")}
            selected={currentTab === "deposits"}
            onClick={() => setCurrentTab("deposits")}
          />
        </div>

        <div className="p-2 w-full sm:w-1/3 md:w-max">
          <TabButton
            className="w-full"
            title={t("withdraws")}
            selected={currentTab === "withdraws"}
            onClick={() => setCurrentTab("withdraws")}
          />
        </div>
      </div>

      {currentTab === "convertations" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-4">
          {convertationsLoading ? (
            <>
              <CoinSkelet />
              <CoinSkelet />
              <CoinSkelet />
            </>
          ) : (
            <>
              {convertationsList && convertationsList.data.length > 0 ? (
                convertationsList.data
                  .slice(0, showMoreConvertations ? undefined : 9)
                  .map((el) => {
                    return <ConvertationsItem key={el.id} data={el} />;
                  })
              ) : (
                <EmptyText
                  className="col-span-1 md:col-span-2 lg:col-span-3"
                  text={t("there are no conversions")}
                />
              )}
            </>
          )}

          {convertationsList && convertationsList.data.length > 9 && (
            <Button
              className="mx-auto col-span-1 md:col-span-2 lg:col-span-3 mt-5"
              title={showMoreConvertations ? t("roll-up") : t("show-more")}
              onClick={() => setShowMoreConvertations((prev) => !prev)}
            />
          )}
        </div>
      )}

      {currentTab === "withdraws" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-4">
          {withdrawsLoading ? (
            <>
              <CoinSkelet />
              <CoinSkelet />
              <CoinSkelet />
            </>
          ) : (
            <>
              {withdrawsList && withdrawsList.data.length > 0 ? (
                withdrawsList.data
                  .slice(0, showMoreWithdraws ? undefined : 9)
                  .map((el) => {
                    return <WithdrawsItem key={el.id} data={el} />;
                  })
              ) : (
                <EmptyText
                  className="col-span-1 md:col-span-2 lg:col-span-3"
                  text={t("there are no conclusions")}
                />
              )}
            </>
          )}

          {withdrawsList && withdrawsList.data.length > 9 && (
            <Button
              className="mx-auto col-span-1 md:col-span-2 lg:col-span-3 mt-5"
              title={showMoreWithdraws ? t("roll-up") : t("show-more")}
              onClick={() => setShowMoreWithdraws((prev) => !prev)}
            />
          )}
        </div>
      )}

      {currentTab === "deposits" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-4">
          {replenishmentLoading ? (
            <>
              <CoinSkelet />
              <CoinSkelet />
              <CoinSkelet />
            </>
          ) : (
            <>
              {replenishmentList && replenishmentList.data.length > 0 ? (
                replenishmentList.data
                  .slice(0, showMoreDeposits ? undefined : 9)
                  .map((el: ReplenishmentItemTypes) => {
                    return <ReplenishmentItem key={el.id} data={el} />;
                  })
              ) : (
                <EmptyText
                  className="col-span-1 md:col-span-2 lg:col-span-3"
                  text={t("there are no deposits")}
                />
              )}
            </>
          )}

          {replenishmentList && replenishmentList.data.length > 9 && (
            <Button
              className="mx-auto col-span-1 md:col-span-2 lg:col-span-3 mt-5"
              title={showMoreDeposits ? t("roll-up") : t("show-more")}
              onClick={() => setShowMoreDeposits((prev) => !prev)}
            />
          )}
        </div>
      )}
    </div>
  );
};
