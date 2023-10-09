import { FC } from "react";
import cn from "clsx";
import { PropsWithClassName, SignInFormData } from "@/types";
import { Button, TextField } from "@/components/ui";
import { useForm } from "react-hook-form";

export const SignInForm: FC<PropsWithClassName> = ({ className }) => {
  const methods = useForm<SignInFormData>();

  const formHandler = ({ username, password }: SignInFormData) => {
    console.log(username, password);
  };

  return (
    <form
      className={cn(className, "flex flex-col gap-4 w-full")}
      onSubmit={methods.handleSubmit(formHandler)}
    >
      <p className="text-red-500 text-sm text-center my-3">
        Неверный логин или пароль
      </p>

      <TextField
        placeholder="Имя пользователя"
        methods={methods}
        registerName="username"
        options={{
          required: {
            value: true,
            message: "Введите имя",
          },

          onChange: () => methods.clearErrors("username"),
        }}
        error={methods.formState.errors.username?.message}
      />

      <TextField
        placeholder="Пароль"
        type="password"
        methods={methods}
        registerName="password"
        options={{
          required: {
            value: true,
            message: "Введите пароль",
          },

          onChange: () => methods.clearErrors("password"),
        }}
        error={methods.formState.errors.password?.message}
      />

      <Button
        className="w-full mt-4"
        type="submit"
        color="primary"
        title="Вход"
      />
    </form>
  );
};
