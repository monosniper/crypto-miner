import { useState } from "react";
import { TabButton } from "@/components/ui";
import {
  useGetConvertationsQuery,
  useGetInvestQuery,
} from "@/redux/api/userApi";
import { useLoading } from "@/hooks";
import { CoinSkelet, ConvertationsItem, EmptyText } from "..";

type Tabs = "deposits" | "convertations" | "withdraw";

export const History = () => {
  const [currentTab, setCurrentTab] = useState<Tabs>("deposits");

  const {
    data: convertationsList,
    isLoading: convertationsIsLoading,
    isFetching: convertationsIsFetching,
  } = useGetConvertationsQuery(null);

  const {
    data: investData,
    isLoading: investIsLoading,
    isFetching: investIsFetching,
  } = useGetInvestQuery(null);

  const convertationsLoading = useLoading(
    convertationsIsLoading,
    convertationsIsFetching,
  );

  const investLoading = useLoading(investIsLoading, investIsFetching);

  return (
    <div>
      <div className="flex items-center -m-2 flex-wrap mt-6">
        <div className="p-2 w-full sm:w-1/3 md:w-max">
          <TabButton
            className="w-full"
            title="Пополнения"
            selected={currentTab === "deposits"}
            onClick={() => setCurrentTab("deposits")}
          />
        </div>

        <div className="p-2 w-full sm:w-1/3 md:w-max">
          <TabButton
            className="w-full"
            title="Конвертации"
            selected={currentTab === "convertations"}
            onClick={() => setCurrentTab("convertations")}
          />
        </div>

        <div className="p-2 w-full sm:w-1/3 md:w-max">
          <TabButton
            className="w-full"
            title="Выводы"
            selected={currentTab === "withdraw"}
            onClick={() => setCurrentTab("withdraw")}
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
              {convertationsList && convertationsList.length > 0 ? (
                convertationsList.map((el) => {
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
    </div>
  );
};
