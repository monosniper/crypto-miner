import { ShowMoreBtn } from "@/components/ui";
import { NftItem } from "../NftItem/NftItem";
import { useGetNftQuery } from "@/redux/api/userApi";
import { useLoading } from "@/hooks";
import { CoinSkelet } from "@/components";
import { useState } from "react";

export const NftList = () => {
  const { data: list, isLoading, isFetching } = useGetNftQuery(null);
  const [skeletItems] = useState(Array(8).fill(0));

  const loading = useLoading(isLoading, isFetching);

  return (
    <>
      <div className="flex items-start flex-wrap -m-2">
        {loading ? (
          <>
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
          </>
        ) : (
          <>
            {list &&
              list.map((el) => {
                return (
                  <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                    <NftItem key={el.id} data={el} />
                  </div>
                );
              })}
          </>
        )}
      </div>
      {list && list.length > 8 && (
        <ShowMoreBtn className="mt-6" onClick={() => console.log("click")} />
      )}
    </>
  );
};
