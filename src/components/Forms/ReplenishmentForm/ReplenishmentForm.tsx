import { Button, FieldWrapper, TextField } from "@/components/ui";
import {
  NamesModals,
  PropsWithClassName,
  ReplenishmentFormData,
} from "@/types";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import cn from "clsx";
import { useTranslation } from "react-i18next";
import { useReplenishmentMutation } from "@/redux/api/userApi";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/store";
import { setOpenModal } from "@/redux/slices/modalsOpensSlice";
import { setText, setTitle } from "@/redux/slices/successModal";

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
    } else {
      dispatch(
        setOpenModal({
          stateNameModal: NamesModals.isOpenSuccessModal,
          isOpen: true,
        }),
      );

      dispatch(setTitle(t("success")));
      dispatch(setText(t("your balance will be updated within an hour")));
    }

    if (data.url) {
      window.open(data.url, "_blank");
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
        >
          <TextField
            type="number"
            methods={methods}
            registerName="amount"
            btn={{ title: "Все", onClick: () => console.log("click") }}
            options={{
              valueAsNumber: true,
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
