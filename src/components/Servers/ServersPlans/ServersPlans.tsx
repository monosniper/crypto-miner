import { ServersPlansItem } from "./ServersPlansItem/ServersPlansItem";
import styles from "./ServersPlans.module.css";
import { useGetAllServersQuery } from "@/redux/api/serversApi";
import { useLoading } from "@/hooks";
import { useState } from "react";
import { CoinSkelet, EmptyText } from "@/components";

export const ServersPlans = () => {
  const {
    data: serversList,
    isLoading: serversIsLoading,
    isFetching: serversIsFetching,
  } = useGetAllServersQuery(null);
  const [skeletItems] = useState(Array(6).fill(0));

  const loading = useLoading(serversIsLoading, serversIsFetching);

  return (
    <div className="flex flex-wrap -m-2">
      {!loading ? (
        <>
          {serversList && serversList.length > 0 ? (
            serversList.map((el) => {
              return (
                <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                  <ServersPlansItem
                    className={el.isHot ? styles.beneficial : "h-full"}
                    data={el}
                  />
                </div>
              );
            })
          ) : (
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
