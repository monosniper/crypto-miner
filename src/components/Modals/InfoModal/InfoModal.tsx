import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { modalsOpens, setOpenModal } from "@/redux/slices/modalsOpensSlice";
import { useTranslation } from "react-i18next";
import { NamesModals } from "@/types";
import { infoModal, setText, setTitle } from "@/redux/slices/infoModalSlice";
import { CloseIcon } from "@/components/icons";
import { Button } from "@/components/ui";

export const InfoModal = () => {
  const { isOpenInfoModal: isOpen } = useAppSelector(modalsOpens);
  const { title, text } = useAppSelector(infoModal);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const close = () => {
    dispatch(
      setOpenModal({
        stateNameModal: NamesModals.isOpenInfoModal,
        isOpen: false,
      })
    );

    dispatch(setTitle(undefined));
    dispatch(setText(undefined));
  };

  return (
    <ModalWrapper isOpen={isOpen}>
      <div className="bg-base-200 border-base-border-100 border rounded-xl p-8 max-w-[608px] lg:min-w-[608px] w-full">
        <div className="flex items-center flex-col gap-8 w-full relative">
          <div
            className="cursor-pointer absolute -top-4 -right-4 lg:top-0 lg:right-0"
            onClick={close}
          >
            <CloseIcon
              className="[&>path]:fill-base-content-100"
              width={20}
              height={20}
            />
          </div>

          <div className="flex flex-col w-full">
            <div className=" flex justify-between items-center gap-4">
              <h4 className="text-2xl font-semibold -translate-y-1">{title}</h4>
            </div>

            <p className="font-inter mt-4 text-base">{text}</p>

            <div className="flex items-center gap-2 flex-wrap mt-auto pt-8">
              <Button
                className="min-[450px]:!w-max"
                title={t("good")}
                color="primary"
                onClick={close}
              />
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
