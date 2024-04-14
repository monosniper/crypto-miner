import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { modalsOpens, setOpenModal } from "@/redux/slices/modalsOpensSlice";
import { CloseIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import { NamesModals } from "@/types";

export const HowUseModal = () => {
  const { isOpenHowUseModal: isOpen } = useAppSelector(modalsOpens);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(
      setOpenModal({
        isOpen: false,
        stateNameModal: NamesModals.isOpenHowUseModal,
      }),
    );
  };

  return (
    <ModalWrapper isOpen={isOpen}>
      <div className="bg-base-200 border-base-border-100 border rounded-xl p-8 w-[90vw]">
        <div className="flex items-center flex-col gap-8 w-full relative">
          <div className="flex justify-between items-center gap-4 w-full">
            <h4 className="text-xl sm:text-2xl font-semibold">
              {t("how use")}
            </h4>

            <div className="cursor-pointer" onClick={close}>
              <CloseIcon
                className="[&>path]:fill-base-content-100"
                width={20}
                height={20}
              />
            </div>
          </div>

          <video
            className="w-full h-[80vh]"
            src="/videos/newnew.mp4"
            controls
            poster="/images/podarok.png"
          ></video>
        </div>
      </div>
    </ModalWrapper>
  );
};
