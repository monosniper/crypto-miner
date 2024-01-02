import { ShowMoreBtn } from "@/components/ui";
import { NftItem } from "../NftItem/NftItem";
import { useLoading } from "@/hooks";
import { CoinSkelet, EmptyText } from "@/components";
import { useState } from "react";
import { useGetWalletQuery } from "@/redux/api/userApi";

export const NftList = () => {
  const {
    data: wallet,
    isLoading,
    isFetching,
    isError,
  } = useGetWalletQuery(null);
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
            {wallet && wallet.data.nfts.length > 0 && (
              <div className="flex flex-wrap -m-2">
                {wallet.data.nfts.map((el) => {
                  return (
                    <div
                      className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                      key={el.id}
                    >
                      <NftItem data={el} />
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

            {!isError && (!wallet || wallet.data.nfts.length === 0) && (
              <div className="flex flex-col flex-grow">
                <EmptyText text="Нет Nft" />
              </div>
            )}
          </>
        )}
      </div>
      {wallet && wallet.data.nfts.length > 8 && (
        <ShowMoreBtn className="mt-6" onClick={() => console.log("click")} />
      )}
    </>
  );
};
