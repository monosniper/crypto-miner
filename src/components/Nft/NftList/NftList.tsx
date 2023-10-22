import { ShowMoreBtn } from "@/components/ui";
import { NftItem } from "../NftItem/NftItem";

export const NftList = () => {
  return (
    <>
      <div className="flex items-start flex-wrap -m-2">
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
          <NftItem />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
          <NftItem />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
          <NftItem />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
          <NftItem />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
          <NftItem />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
          <NftItem />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
          <NftItem />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
          <NftItem />
        </div>
      </div>
      <ShowMoreBtn className="mt-6" onClick={() => console.log("click")} />
    </>
  );
};
