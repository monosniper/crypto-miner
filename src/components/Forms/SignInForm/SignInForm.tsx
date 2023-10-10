import { FC, useEffect, useState } from "react";
import cn from "clsx";
import { PropsWithClassName, SignInFormData } from "@/types";
import { Button, TextFieldAuth } from "@/components/ui";
import { useForm } from "react-hook-form";
import { useLazyGetMeQuery } from "@/redux/api/userApi";
import { useLoading } from "@/hooks";
import { useAppDispatch } from "@/redux/store";
import { setAuth, setUserData } from "@/redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

export const SignInForm: FC<PropsWithClassName> = ({ className }) => {
  const methods = useForm<SignInFormData>();
  const [getMe, { data, error, isLoading, isFetching }] = useLazyGetMeQuery();
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();

  const formHandler = ({ username, password }: SignInFormData) => {
    getMe({
      username,
      password,
    });

    setPassword(password);
  };

  const loading = useLoading(isLoading, isFetching);

  useEffect(() => {
    if (!data) return;

    if (password) {
      dispatch(setUserData(data));

      const hashedPassword = CryptoJS.AES.encrypt(
        password,
        import.meta.env.VITE_CRYPT_KEY,
      ).toString();

      const mainUserData = {
        email: data.email,
        password: hashedPassword,
      };

      localStorage.setItem("mainUserData", JSON.stringify(mainUserData));

      dispatch(setAuth(true));

      navigate("/main");
    }
  }, [data, dispatch, navigate, password]);

  useEffect(() => {
    if (!error) return;

    setPassword(undefined);
  }, [error]);

  return (
    <form
      className={cn(className, "flex flex-col gap-4 w-full")}
      onSubmit={methods.handleSubmit(formHandler)}
    >
      {error && (
        <p className="text-red-500 text-sm text-center my-3">
          Неверный логин или пароль
        </p>
      )}

      <TextFieldAuth
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

      <TextFieldAuth
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
        title={loading ? "Загрузка..." : "Вход"}
        disabled={loading}
      />
    </form>
  );
};
