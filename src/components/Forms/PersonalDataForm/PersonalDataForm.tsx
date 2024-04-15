import { Button, FieldWrapper, TextField } from "@/components/ui";
import { useUpdateMeMutation } from "@/redux/api/userApi";
import { user } from "@/redux/slices/userSlice";
import { useAppSelector } from "@/redux/store";
import { PersonalFormData } from "@/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const PersonalDataForm = () => {
  const methods = useForm<PersonalFormData>();
  const { setValue } = methods;
  const { t } = useTranslation();
  const { userData } = useAppSelector(user);
  const [update, { data, error, isLoading }] = useUpdateMeMutation();

  const formHandler = (data: PersonalFormData) => {
    const sendData = {
      first_name: data.first_name,
      last_name: data.last_name,
      name: data.name,
      phone: data.phone,
      email: data.email,
    };

    update(sendData);
  };

  useEffect(() => {
    if (!userData) return;

    setValue("email", userData.email || "");
    setValue("name", userData.name || "");
    setValue("first_name", userData.first_name || "");
    setValue("last_name", userData.last_name || "");
    setValue("phone", userData.phone || "");
  }, [setValue, userData]);

  useEffect(() => {
    if (!data || !data.success) return;

    toast.success(t("success"));
  }, [data, t]);

  useEffect(() => {
    if (!error) return;

    toast.error(t("failed"));
  }, [error, t]);

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={methods.handleSubmit(formHandler)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
        <FieldWrapper
          className="w-full"
          title={t("first-name")}
          error={
            methods.formState.errors.first_name
              ? methods.formState.errors.first_name.message
              : undefined
          }
        >
          <TextField methods={methods} registerName="first_name" />
        </FieldWrapper>

        <FieldWrapper
          className="w-full"
          title={t("last-name")}
          error={
            methods.formState.errors.last_name
              ? methods.formState.errors.last_name.message
              : undefined
          }
        >
          <TextField methods={methods} registerName="last_name" />
        </FieldWrapper>

        <FieldWrapper
          className="w-full"
          title={t("username")}
          error={
            methods.formState.errors.name
              ? methods.formState.errors.name.message
              : undefined
          }
        >
          <TextField methods={methods} registerName="name" />
        </FieldWrapper>

        <FieldWrapper
          className="w-full"
          title={t("phone")}
          error={
            methods.formState.errors.phone
              ? methods.formState.errors.phone.message
              : undefined
          }
        >
          <TextField type="tel" methods={methods} registerName="phone" />
        </FieldWrapper>

        <FieldWrapper
          className="w-full"
          title={t("email")}
          error={
            methods.formState.errors.email
              ? methods.formState.errors.email.message
              : undefined
          }
        >
          <TextField type="email" methods={methods} registerName="email" />
        </FieldWrapper>

        {!userData?.isVerificated && (
          <Button
            className="h-[54px] rounded-lg w-full"
            title={t("Send an email")}
          />
        )}
      </div>

      <Button
        type="submit"
        color="primary"
        title={isLoading ? t("loading") : t("save")}
        disabled={isLoading}
      />
    </form>
  );
};
