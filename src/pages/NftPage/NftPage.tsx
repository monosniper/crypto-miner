import { NftList, NftWithdrawSuccessModal, Title } from "@/components";
import { NftWithdrawModal } from "@/components/Modals/NftWithdrawModal/NftWithdrawModal";
import { useTranslation } from "react-i18next";

export const NftPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col flex-grow">
        <Title className="flex lg:hidden pb-6" title={t("nft-wallet")} />

        <NftList />
      </div>

      <NftWithdrawModal />
      <NftWithdrawSuccessModal />
    </div>
  );
};
