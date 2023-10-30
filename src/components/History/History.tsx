import { useState } from "react";
import { TabButton } from "@/components/ui";
import { useGetConvertationsQuery } from "@/redux/api/userApi";
import { useLoading } from "@/hooks";

type Tabs = "deposits" | "convertations" | "withdraw";

export const History = () => {
  const [currentTab, setCurrentTab] = useState<Tabs>("deposits");

  const {
    data: convertationsList,
    isLoading: convertationsIsLoading,
    isFetching: convertationsIsFetching,
  } = useGetConvertationsQuery(null);

  const convertationsLoading = useLoading(
    convertationsIsLoading,
    convertationsIsFetching,
  );

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
    </div>
  );
};
