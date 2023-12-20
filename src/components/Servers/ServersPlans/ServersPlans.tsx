import { ServersPlansItem } from "./ServersPlansItem/ServersPlansItem";
import styles from "./ServersPlans.module.css";
import { useGetAllServersQuery } from "@/redux/api/serversApi";
import { useLoading } from "@/hooks";
import { useState } from "react";
import { CoinSkelet, EmptyText } from "@/components";
import { ServerTypes } from "@/types";

export const ServersPlans = () => {
  const {
    data: serversList,
    isLoading: serversIsLoading,
    isFetching: serversIsFetching,
    isError: serversIsError,
  } = useGetAllServersQuery(null);
  const [skeletItems] = useState(Array(6).fill(0));

  const loading = useLoading(serversIsLoading, serversIsFetching);

  const sortedServersList = serversList?.data
    ?.map((el) => el)
    .sort((a, b) => {
      if (a.type === ServerTypes.FREE) {
        return -1;
      }
      if (b.type === ServerTypes.FREE) {
        return 1;
      }
      return 0;
    });

  return (
    <div className="flex flex-wrap -m-2">
      {!loading ? (
        <>
          {sortedServersList &&
            sortedServersList.length > 0 &&
            sortedServersList.map((el) => {
              return (
                <div className="w-full md:w-1/2 lg:w-1/3 p-2" key={el.id}>
                  <ServersPlansItem
                    className={el.isHot ? styles.beneficial : "h-full"}
                    data={el}
                  />
                </div>
              );
            })}

          {(serversIsError ||
            !serversList ||
            serversList.data.length === 0) && (
            <div className="flex flex-col flex-grow">
              <EmptyText text="Нет получилось получить данные" />
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
