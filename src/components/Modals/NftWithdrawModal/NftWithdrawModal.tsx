import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { modalsOpens, setOpenModal } from "@/redux/slices/modalsOpensSlice";
import { CloseIcon } from "@/components/icons";
import { NamesModals } from "@/types";
import {
  setWithdrawNftData,
  withdrawNftModal,
} from "@/redux/slices/withdrawNftModalSlice";
import { WithdrawNftForm } from "@/components";

export const NftWithdrawModal = () => {
  const { isOpenNftWithdrawModal: isOpen } = useAppSelector(modalsOpens);
  const { nftData } = useAppSelector(withdrawNftModal);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(
      setOpenModal({
        stateNameModal: NamesModals.isOpenNftWithdrawModal,
        isOpen: false,
      }),
    );

    dispatch(setWithdrawNftData(undefined));
  };

  return (
    <ModalWrapper isOpen={isOpen}>
      <div className="bg-base-200 border-base-border-100 border rounded-xl p-8 max-w-[800px] lg:min-w-[800px] w-full">
        <div className="flex items-center flex-col lg:items-stretch lg:flex-row lg:gap-8 w-full relative">
          <div
            className="cursor-pointer absolute -top-4 -right-4 lg:top-0 lg:right-0"
            onClick={closeModal}
          >
            <CloseIcon
              className="[&>path]:fill-base-content-100"
              width={20}
              height={20}
            />
          </div>

          <img
            className="rounded-xl max-w-[256px] w-full h-auto m-4 lg:m-0"
            src={nftData?.image_url}
            alt={nftData?.name}
          />

          <WithdrawNftForm cancelOnClick={closeModal} />
        </div>
      </div>
    </ModalWrapper>
  );
};
