import { ServersPlansItem } from "./ServersPlansItem/ServersPlansItem";
import styles from "./ServersPlans.module.css";
import { useGetPresetsQuery } from "@/redux/api/serversApi";
import { useLoading } from "@/hooks";
import { useState } from "react";
import { CoinSkelet, EmptyText } from "@/components";

export const ServersPlans = () => {
  const {
    data: serversList,
    isLoading: serversIsLoading,
    isFetching: serversIsFetching,
    isError: serversIsError,
  } = useGetPresetsQuery(null);
  const [skeletItems] = useState(Array(6).fill(0));

  const loading = useLoading(serversIsLoading, serversIsFetching);

  return (
    <div className="flex flex-wrap -m-2">
      {!loading ? (
        <>
          {serversList?.data &&
            serversList?.data.length > 0 &&
            serversList?.data.map((el) => {
              return (
                <div className="w-full md:w-1/2 lg:w-1/3 p-2" key={el.id}>
                  <ServersPlansItem
                    className={el.isHot ? styles.beneficial : "h-full"}
                    data={el as any}
                  />
                </div>
              );
            })}

          {(serversIsError ||
            !serversList ||
            serversList.data.length === 0) && (
            <div className="flex flex-col flex-grow">
              <EmptyText text="Не получилось получить данные" />
            </div>
          )}
        </>
      ) : (
        <>
          {skeletItems.map((_, idx) => {
            return (
              <div key={idx} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                <CoinSkelet />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
