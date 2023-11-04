import { NftList, NftWithdrawSuccessModal, Title } from "@/components";
import { NftWithdrawModal } from "@/components/Modals/NftWithdrawModal/NftWithdrawModal";

export const NftPage = () => {
  return (
    <>
      <div>
        <Title className="flex lg:hidden pb-6" title="NFT Кошелёк" />

        <div>
          <NftList />
        </div>
      </div>

      <NftWithdrawModal />
      <NftWithdrawSuccessModal />
    </>
  );
};
