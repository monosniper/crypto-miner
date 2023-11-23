import { useState } from "react";
import { TabButton } from "@/components/ui";
import {
  useGetConvertationsQuery,
  useGetWithdrawsQuery,
} from "@/redux/api/userApi";
import { useLoading } from "@/hooks";
import {
  CoinSkelet,
  ConvertationsItem,
  EmptyText,
  WithdrawsItem,
} from "@/components";
import { useTranslation } from "react-i18next";

type Tabs = "deposits" | "convertations" | "withdraws";

export const History = () => {
  const [currentTab, setCurrentTab] = useState<Tabs>("convertations");

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

  const convertationsLoading = useLoading(
    convertationsIsLoading,
    convertationsIsFetching,
  );

  const withdrawsLoading = useLoading(withdrawsIsLoading, withdrawsIsFetching);
  const { t } = useTranslation();

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
            title={t("deposits")}
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
                convertationsList.data.map((el) => {
                  return <ConvertationsItem key={el.id} data={el} />;
                })
              ) : (
                <EmptyText
                  className="col-span-1 md:col-span-2 lg:col-span-3"
                  text="Нет конвертаций"
                />
              )}
            </>
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
              {withdrawsList && withdrawsList.length > 0 ? (
                withdrawsList.map((el) => {
                  return <WithdrawsItem key={el.id} data={el} />;
                })
              ) : (
                <EmptyText
                  className="col-span-1 md:col-span-2 lg:col-span-3"
                  text="Нет выводов"
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
