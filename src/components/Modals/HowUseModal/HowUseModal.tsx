import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { modalsOpens, setOpenModal } from "@/redux/slices/modalsOpensSlice";
import { CloseIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import { NamesModals } from "@/types";
import { useGetSettingsQuery } from "@/redux/api/mainApi";
import { useEffect } from "react";
import { user } from "@/redux/slices/userSlice";

export const HowUseModal = () => {
  const { isOpenHowUseModal: isOpen } = useAppSelector(modalsOpens);
  const { isAuth } = useAppSelector(user);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data: settings } = useGetSettingsQuery(null);

  const close = () => {
    dispatch(
      setOpenModal({
        isOpen: false,
        stateNameModal: NamesModals.isOpenHowUseModal,
      })
    );
  };

  useEffect(() => {
    if (!isAuth) return;

    if (!localStorage.getItem("opened-video")) {
      dispatch(
        setOpenModal({
          isOpen: true,
          stateNameModal: NamesModals.isOpenHowUseModal,
        })
      );
      localStorage.setItem("opened-video", JSON.stringify(true));
    }
  }, [dispatch, isAuth]);

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

          {settings?.how_video ? (
            <video
              className="w-full h-[80vh]"
              src={settings.how_video}
              controls
            ></video>
          ) : (
            <p className="min-h-[200px] flex items-center text-xl">
              {t("The video has not been added at the moment")}
            </p>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};
