import { modalsOpens, setOpenModal } from "@/redux/slices/modalsOpensSlice";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { NamesModals } from "@/types";
import { CloseIcon } from "@/components/icons";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui";
import { setText, setTitle, successModal } from "@/redux/slices/successModal";

export const SuccessModal = () => {
  const { isOpenSuccessModal: isOpen } = useAppSelector(modalsOpens);
  const { title, text } = useAppSelector(successModal);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type");

  const close = () => {
    dispatch(
      setOpenModal({
        stateNameModal: NamesModals.isOpenSuccessModal,
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
              <h4 className="text-2xl font-semibold -translate-y-1">
                {type !== "server_exists" && "🤘"} {title}
              </h4>
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
