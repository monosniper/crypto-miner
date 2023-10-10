import { FieldWrapper, TextField } from "@/components/ui";
import { PropsWithClassName, WithdrawalFormData } from "@/types";
import { FC } from "react";
import { useForm } from "react-hook-form";
import cn from "clsx";

export const WithdrawalForm: FC<PropsWithClassName> = ({ className }) => {
  const methods = useForm<WithdrawalFormData>();

  return (
    <form className={cn(className)}>
      <div className="w-full flex flex-wrap -m-4">
        <FieldWrapper className="w-full md:w-1/2 p-4" title="Сумма, USDT">
          <TextField
            methods={methods}
            registerName="sum"
            btn={{ title: "Все", onClick: () => console.log("click") }}
          />
        </FieldWrapper>

        <FieldWrapper className="w-full md:w-1/2 p-4" title="Кошелёк">
          <TextField methods={methods} registerName="wallet" />
        </FieldWrapper>
      </div>
    </form>
  );
};
