import { Button, TextFieldAuth } from "@/components/ui";
import { useUpdatePasswordMutation } from "@/redux/api/userApi";
import { NewPasswordFormData, PropsWithClassName } from "@/types";
import cn from "clsx";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  code: string | null;
  disabled: boolean;
};

export const NewPasswordForm: FC<PropsWithClassName<Props>> = ({
  className,
  code,
  disabled,
}) => {
  const { t } = useTranslation();
  const methods = useForm<NewPasswordFormData>();
  const [updatePassword, { data, error, isLoading }] =
    useUpdatePasswordMutation();
  const navigate = useNavigate();

  const formHandler = (data: NewPasswordFormData) => {
    if (data.newPassword !== data.newPasswordRepeat) {
      return toast.error("passwords don't match");
    }

    if (!code) {
      return;
    }

    updatePassword({ password: data.newPassword, code });
  };

  useEffect(() => {
    if (!data || !data.success) return;

    toast.success(t("success"));

    navigate("/auth/sign-in");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, navigate]);

  useEffect(() => {
    if (!error) return;

    toast.error(t("mistake"));
  }, [error, t]);

  return (
    <form
      className={cn(className, "flex flex-col gap-4 w-full")}
      onSubmit={methods.handleSubmit(formHandler)}
    >
      <TextFieldAuth
        placeholder={t("password")}
        type="password"
        methods={methods}
        registerName="newPassword"
        options={{
          required: {
            value: true,
            message: t("enter password"),
          },

          onChange: () => methods.clearErrors("newPassword"),
        }}
        error={methods.formState.errors.newPassword?.message}
      />

      <TextFieldAuth
        placeholder={t("password")}
        type="password"
        methods={methods}
        registerName="newPasswordRepeat"
        options={{
          required: {
            value: true,
            message: t("enter password"),
          },

          onChange: () => methods.clearErrors("newPasswordRepeat"),
        }}
        error={methods.formState.errors.newPasswordRepeat?.message}
      />

      <Button
        className="w-full mt-4"
        type="submit"
        color="primary"
        title={isLoading ? t("loading") : t("change the password")}
        disabled={isLoading || disabled}
      />
    </form>
  );
};
