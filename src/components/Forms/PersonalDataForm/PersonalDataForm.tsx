import { Button, FieldWrapper, TextField } from "@/components/ui";
import { user } from "@/redux/slices/userSlice";
import { useAppSelector } from "@/redux/store";
import { PersonalFormData } from "@/types";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const formHandler = (data: PersonalFormData) => {
  console.log(data);
};

export const PersonalDataForm = () => {
  const methods = useForm<PersonalFormData>();
  const { t } = useTranslation();
  const { userData } = useAppSelector(user);

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
            methods.formState.errors.firstName
              ? methods.formState.errors.firstName.message
              : undefined
          }
        >
          <TextField methods={methods} registerName="firstName" />
        </FieldWrapper>

        <FieldWrapper
          className="w-full"
          title={t("last-name")}
          error={
            methods.formState.errors.lastName
              ? methods.formState.errors.lastName.message
              : undefined
          }
        >
          <TextField methods={methods} registerName="lastName" />
        </FieldWrapper>

        <FieldWrapper
          className="w-full"
          title={t("username")}
          error={
            methods.formState.errors.username
              ? methods.formState.errors.username.message
              : undefined
          }
        >
          <TextField methods={methods} registerName="username" />
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

      <Button type="submit" color="primary" title={t("save")} />
    </form>
  );
};
