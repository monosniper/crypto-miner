import { NftList, NftWithdrawSuccessModal, Title } from "@/components";
import { NftWithdrawModal } from "@/components/Modals/NftWithdrawModal/NftWithdrawModal";

export const NftPage = () => {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col flex-grow">
        <Title className="flex lg:hidden pb-6" title="NFT Кошелёк" />

        <NftList />
      </div>

      <NftWithdrawModal />
      <NftWithdrawSuccessModal />
    </div>
  );
};
