import { PasswordRecoveryFormData, PropsWithClassName } from "@/types";
import { useForm } from "react-hook-form";
import cn from "clsx";
import { Button, TextFieldAuth } from "@/components/ui";
import { useTranslation } from "react-i18next";
import { useForgotPasswordMutation } from "@/redux/api/userApi";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const PasswordRecoveryForm: FC<PropsWithClassName> = ({ className }) => {
  const methods = useForm<PasswordRecoveryFormData>();
  const [recoverPassword, { data, error, isLoading }] =
    useForgotPasswordMutation();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);

  const formHandler = (data: PasswordRecoveryFormData) => {
    recoverPassword({ email: data.email });
  };

  useEffect(() => {
    if (!data || !data.success) return;

    if (step !== 2) {
      setStep(2);
    }

    toast.success(
      t("the link for password recovery has been sent to the mail"),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, toast]);

  return (
    <form
      className={cn(className, "flex flex-col gap-4 w-full")}
      onSubmit={methods.handleSubmit(formHandler)}
    >
      {step === 1 && (
        <>
          {error && (
            <p className="text-red-500 text-sm text-center my-3">
              {t("invalid username or password")}
            </p>
          )}

          <TextFieldAuth
            placeholder="Email"
            methods={methods}
            registerName="email"
            options={{
              required: {
                value: true,
                message: t("enter email"),
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t("enter the correct email"),
              },
              onChange: () => methods.clearErrors("email"),
            }}
            error={methods.formState.errors.email?.message}
          />

          <Button
            className="w-full mt-4"
            type="submit"
            color="primary"
            title={t("send")}
            disabled={data ? true : isLoading}
          />
        </>
      )}

      {step === 2 && (
        <div className="mt-5 flex flex-col items-center text-center gap-5 text-base-content-100">
          <p>{t("the link for password recovery has been sent to the mail")}</p>

          <Button
            title={t("resend")}
            type="submit"
            color="primary"
            disabled={isLoading}
          />
        </div>
      )}
    </form>
  );
};
