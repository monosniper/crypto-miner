import { Button, FieldWrapper, TextField } from "@/components/ui";
import { PropsWithClassName, ReplenishmentFormData } from "@/types";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import cn from "clsx";
import { useTranslation } from "react-i18next";
import { useReplenishmentMutation } from "@/redux/api/userApi";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/store";

export const ReplenishmentForm: FC<PropsWithClassName> = ({ className }) => {
  const methods = useForm<ReplenishmentFormData>();
  const { t } = useTranslation();
  const [replenishment, { data, isError, isLoading }] =
    useReplenishmentMutation();
  const dispatch = useAppDispatch();

  const formHandler = (data: ReplenishmentFormData) => {
    if (!data.amount) {
      return toast.warning(t("fill in all the fields"));
    }

    return replenishment({
      amount: data.amount,
    });
  };

  useEffect(() => {
    if (!data) return;

    if (!data.url || data.success === false) {
      toast.error(t("mistake"));
    }

    if (data.url) {
      document.location.href = data.url;
    }
  }, [data, dispatch, t]);

  useEffect(() => {
    if (!isError) return;

    toast.error(t("mistake"));
  }, [isError, t]);

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
                value: 100,
                message: t("minimum amount") + "-" + "50 usdt",
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
