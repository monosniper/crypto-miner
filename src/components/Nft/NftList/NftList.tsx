import { ShowMoreBtn } from "@/components/ui";
import { NftItem } from "../NftItem/NftItem";
import { useGetNftQuery } from "@/redux/api/userApi";
import { useLoading } from "@/hooks";
import { CoinSkelet, EmptyText } from "@/components";
import { useState } from "react";

export const NftList = () => {
  const { data: list, isLoading, isFetching, isError } = useGetNftQuery(null);
  const [skeletItems] = useState(Array(8).fill(0));

  const loading = useLoading(isLoading, isFetching);

  return (
    <>
      <div className="flex flex-col flex-grow">
        {loading ? (
          <div className="flex flex-wrap -m-2">
            {skeletItems.map((_, idx) => {
              return (
                <div
                  key={idx}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                >
                  <CoinSkelet />
                </div>
              );
            })}
          </div>
        ) : (
          <>
            {list && list.length > 0 && (
              <div className="flex flex-wrap -m-2">
                {list.map((el) => {
                  return (
                    <div
                      className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                      key={el.id}
                    >
                      <NftItem key={el.id} data={el} />
                    </div>
                  );
                })}
              </div>
            )}

            {isError && (
              <div className="flex flex-col flex-grow">
                <EmptyText text="Не получилось получить Nft" />
              </div>
            )}

            {!isError && (!list || list.length === 0) && (
              <div className="flex flex-col flex-grow">
                <EmptyText text="Нет Nft" />
              </div>
            )}
          </>
        )}
      </div>
      {list && list.length > 8 && (
        <ShowMoreBtn className="mt-6" onClick={() => console.log("click")} />
      )}
    </>
  );
};
