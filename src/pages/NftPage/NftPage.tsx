import { NftList, Title } from "@/components";

export const NftPage = () => {
  return (
    <div>
      <Title className="flex lg:hidden pb-6" title="NFT Кошелёк" />

      <div>
        <NftList />
      </div>
    </div>
  );
};
