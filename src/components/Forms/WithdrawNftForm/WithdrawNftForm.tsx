import { Button, FieldWrapper, TextField } from "@/components/ui";
import { useWithdrawsMutation } from "@/redux/api/userApi";
import { setOpenModal } from "@/redux/slices/modalsOpensSlice";
import { withdrawNftModal } from "@/redux/slices/withdrawNftModalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { NamesModals } from "@/types";
import { FC, MouseEventHandler, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

type Props = {
  cancelOnClick?: MouseEventHandler<HTMLButtonElement>;
};

type FormData = {
  wallet?: string;
};

export const WithdrawNftForm: FC<Props> = ({ cancelOnClick }) => {
  const { t } = useTranslation();
  const methods = useForm<FormData>();
  const [withdrawNft, { isSuccess, isError, isLoading }] =
    useWithdrawsMutation();
  const { nftData } = useAppSelector(withdrawNftModal);
  const dispatch = useAppDispatch();

  const formHandler = (data: FormData) => {
    if (!data.wallet) {
      return toast.error(t("enter your wallet"));
    }

    if (!nftData) return;

    withdrawNft({
      type: "nft",
      wallet: data.wallet,
      nft_id: nftData.id,
    });
  };

  useEffect(() => {
    if (!isError) return;

    toast.error(t("mistake") + ". " + t("try again later"));
  }, [isError, t]);

  useEffect(() => {
    if (!isSuccess) return;

    dispatch(
      setOpenModal({
        stateNameModal: NamesModals.isOpenNftWithdrawModal,
        isOpen: false,
      }),
    );

    dispatch(
      setOpenModal({
        stateNameModal: NamesModals.isOpenNftWithdrawSuccessModal,
        isOpen: true,
      }),
    );
  }, [isSuccess, dispatch]);

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={methods.handleSubmit(formHandler)}
    >
      <div className=" flex justify-between items-center gap-4">
        <h4 className="text-2xl font-semibold -translate-y-1">
          {t("enter the wallet address")}
        </h4>
      </div>

      <p className="font-inter mt-4 text-base">
        {t("all conclusions are carried out every Friday at 18:00 Moscow time")}
      </p>

      <div className="mt-8">
        <FieldWrapper title={t("wallet")}>
          <TextField
            placeholder={t("enter your wallet")}
            registerName="wallet"
            methods={methods}
          />
        </FieldWrapper>
      </div>

      <div className="flex items-center gap-2 flex-wrap mt-auto pt-8">
        <Button
          className="flex flex-grow basis-[200px] lg:basis-0 lg:flex-grow-0"
          title={t("cancel")}
          color="standart"
          onClick={cancelOnClick}
        />
        <Button
          type="submit"
          className="flex flex-grow basis-[200px] lg:basis-0 lg:flex-grow-0"
          title={isLoading ? t("loading") : t("withdraw")}
          disabled={isLoading}
          color="primary"
        />
      </div>
    </form>
  );
};
