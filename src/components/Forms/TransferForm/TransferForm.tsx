import { Button, FieldWrapper, TextField } from "@/components/ui";
import { PropsWithClassName, TransferFormData } from "@/types";
import { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import cn from "clsx";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useGetWalletQuery, useTransferMutation } from "@/redux/api/userApi";
import {
  useCheckUsernameMutation,
  useGetSettingsQuery,
} from "@/redux/api/mainApi";

export const TransferForm: FC<PropsWithClassName> = ({ className }) => {
  const methods = useForm<TransferFormData>();
  const { t } = useTranslation();
  const [transfer, { isSuccess, isError, isLoading }] = useTransferMutation();
  const [
    checkUsername,
    {
      data: checkUsernameData,
      isError: checkUsernameIsError,
      isLoading: checkUsernameIsLoading,
    },
  ] = useCheckUsernameMutation();
  const { data: walletData } = useGetWalletQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const [successNickname, setSuccessNickname] = useState<string>();
  const { data: settings } = useGetSettingsQuery(null);
  const [amountWithCommission, setAmountWithCommission] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const formHandler = (data: TransferFormData) => {
    if (checkUsernameIsLoading) {
      return toast.warning(t("the user is being verified"));
    }

    if (!data.amount || !data.nickname) {
      return toast.error(t("fill in all the fields"));
    }

    if (!checkUsernameData?.success || !walletData || checkUsernameIsError) {
      return;
    }

    const balanceUsdt = walletData.data.balance.USDT;

    if (balanceUsdt < data.amount) {
      toast.error(t("insufficient funds"));
    }

    setSuccessNickname(data.nickname);

    transfer({ username: data.nickname, amount: data.amount });
  };

  useEffect(() => {
    if (!isSuccess) return;

    toast.success(
      `${t("the user")} ${successNickname} ${t("has received your funds")}`,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, t]);

  useEffect(() => {
    if (!isError) return;

    toast.error(t("mistake"));
  }, [isError, t]);

  useEffect(() => {
    if (!checkUsernameIsError) return;

    toast.error(t("mistake"));
  }, [checkUsernameIsError, t]);

  return (
    <form
      className={cn(className)}
      onSubmit={methods.handleSubmit(formHandler)}
    >
      <div className="flex flex-wrap -m-4">
        <FieldWrapper
          className="w-full md:w-1/2 p-4"
          title={`${t("amount")}, USDT`}
          error={
            methods.formState.errors.amount
              ? methods.formState.errors.amount.message
              : undefined
          }
        >
          <TextField
            type="number"
            methods={methods}
            registerName="amount"
            options={{
              valueAsNumber: true,
              min: {
                value: settings?.transfer_min
                  ? Number(settings?.transfer_min)
                  : 0,
                message:
                  t("minimum amount") +
                  "-" +
                  `${
                    settings?.transfer_min ? Number(settings.transfer_min) : 0
                  } usdt`,
              },

              onChange: (e) => {
                if (!settings?.transfer_fee) return;

                setAmountWithCommission(
                  Number(e.target.value) *
                    (1 - Number(settings.transfer_fee) / 100),
                );
              },
            }}
          />

          {Boolean(amountWithCommission) && (
            <p className="mt-2 text-gray-1">
              {t("taking into account the commission") +
                ": " +
                amountWithCommission +
                " usdt"}
            </p>
          )}
        </FieldWrapper>

        <FieldWrapper
          className="w-full md:w-1/2 p-4"
          title={t("nickname")}
          error={
            checkUsernameData?.success === false
              ? t("there is no such user")
              : undefined
          }
        >
          <TextField
            methods={methods}
            registerName="nickname"
            options={{
              onChange: (e) => {
                if (timeoutRef.current) {
                  window.clearTimeout(timeoutRef.current);
                }

                const newTimeoutId = window.setTimeout(() => {
                  checkUsername({ username: e.target.value });
                }, 100);

                timeoutRef.current = newTimeoutId;
              },
            }}
          />
        </FieldWrapper>
      </div>

      <Button
        className="mt-8"
        type="submit"
        color="primary"
        disabled={isLoading}
        title={isLoading ? t("loading") : t("deposit")}
      />
    </form>
  );
};
