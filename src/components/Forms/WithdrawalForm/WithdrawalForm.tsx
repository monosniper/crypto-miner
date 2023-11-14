import { Button, FieldWrapper, TextField } from "@/components/ui";
import { PropsWithClassName, WithdrawalFormData } from "@/types";
import { FC } from "react";
import { useForm } from "react-hook-form";
import cn from "clsx";
import { useTranslation } from "react-i18next";

export const WithdrawalForm: FC<PropsWithClassName> = ({ className }) => {
  const methods = useForm<WithdrawalFormData>();
  const { t } = useTranslation();

  return (
    <form className={cn(className)}>
      <div className="flex flex-wrap -m-4">
        <FieldWrapper
          className="w-full md:w-1/2 p-4"
          title={`${t("amount")}, USDT`}
        >
          <TextField
            methods={methods}
            registerName="sum"
            btn={{ title: "Все", onClick: () => console.log("click") }}
          />
        </FieldWrapper>

        <FieldWrapper className="w-full md:w-1/2 p-4" title={t("wallet")}>
          <TextField methods={methods} registerName="wallet" />
        </FieldWrapper>
      </div>

      <Button
        className="mt-8"
        type="submit"
        color="primary"
        title={t("withdraw")}
      />
    </form>
  );
};
