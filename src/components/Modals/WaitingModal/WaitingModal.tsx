import { modalsOpens, setOpenModal } from "@/redux/slices/modalsOpensSlice";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { NamesModals } from "@/types";
import { CloseIcon } from "@/components/icons";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { setText, setTitle, waitingModal } from "@/redux/slices/waitingModal";

export const WaitingModal = () => {
  const { isOpenWaitingModal: isOpen } = useAppSelector(modalsOpens);
  const { title, text } = useAppSelector(waitingModal);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const close = () => {
    dispatch(
      setOpenModal({
        stateNameModal: NamesModals.isOpenWaitingModal,
        isOpen: false,
      })
    );

    dispatch(setTitle(undefined));
    dispatch(setText(undefined));
    navigate("/wallet");
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
              <h4 className="text-2xl font-semibold -translate-y-1 flex items-center gap-2">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffc800"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M4.51555 7C3.55827 8.4301 3 10.1499 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3V6M12 12L8 8"
                      stroke="#ffcc00"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
                {title}
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
