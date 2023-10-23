import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { modalsOpens, setOpenModal } from "@/redux/slices/modalsOpensSlice";
import { CloseIcon } from "@/components/icons";
import { NamesModals } from "@/types";
import { Button, FieldWrapper, TextField } from "@/components/ui";

export const NftWithdrawModal = () => {
  const { isOpenNftWithdrawModal: isOpen } = useAppSelector(modalsOpens);
  const dispatch = useAppDispatch();

  return (
    <ModalWrapper isOpen={isOpen}>
      <div className="bg-base-200 border-base-border-100 border rounded-xl p-8 max-w-[800px] lg:min-w-[800px] w-full">
        <div className="flex items-center flex-col lg:items-stretch lg:flex-row lg:gap-8 w-full relative">
          <div
            className="cursor-pointer absolute -top-4 -right-4 lg:top-0 lg:right-0"
            onClick={() =>
              dispatch(
                setOpenModal({
                  stateNameModal: NamesModals.isOpenNftWithdrawModal,
                  isOpen: false,
                }),
              )
            }
          >
            <CloseIcon
              className="[&>path]:fill-base-content-100"
              width={20}
              height={20}
            />
          </div>

          <img
            className="rounded-xl max-w-[256px] w-full h-auto m-4 lg:m-0"
            src="/images/nft-img.png"
            alt="nft"
          />

          <div className="flex flex-col w-full">
            <div className=" flex justify-between items-center gap-4">
              <h4 className="text-2xl font-semibold -translate-y-1">
                Введите адрес кошелька
              </h4>
            </div>

            <p className="font-inter mt-4 text-base">Текст с информацией</p>

            <div className="mt-8">
              <FieldWrapper title="Кошелёк">
                <TextField placeholder="Введите кошелёк" />
              </FieldWrapper>
            </div>

            <div className="flex items-center gap-2 flex-wrap mt-auto pt-8">
              <Button
                className="flex flex-grow basis-[200px] lg:basis-0 lg:flex-grow-0"
                title="Отмена"
                color="standart"
              />
              <Button
                className="flex flex-grow basis-[200px] lg:basis-0 lg:flex-grow-0"
                title="Вывести"
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
