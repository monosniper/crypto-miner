import { FC, useEffect, useState } from "react";
import cn from "clsx";
import { PropsWithClassName, SignInFormData } from "@/types";
import { Button, TextFieldAuth } from "@/components/ui";
import { useForm } from "react-hook-form";
import { useLazyGetMeQuery } from "@/redux/api/userApi";
import { useLoading } from "@/hooks";
import { useAppDispatch } from "@/redux/store";
import { setUserData } from "@/redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

export const SignInForm: FC<PropsWithClassName> = ({ className }) => {
  const methods = useForm<SignInFormData>();
  const [getMe, { data, error, isLoading, isFetching }] = useLazyGetMeQuery();
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formHandler = ({ email, password }: SignInFormData) => {
    getMe({
      email,
      password,
    });

    setPassword(password);
  };

  const loading = useLoading(isLoading, isFetching);

  useEffect(() => {
    if (!data) return;

    if (password) {
      dispatch(setUserData(data.data));

      const hashedPassword = CryptoJS.AES.encrypt(
        password,
        import.meta.env.VITE_CRYPT_KEY,
      ).toString();

      const token = data.data.token;

      const mainUserData = {
        email: data.data.email,
        password: hashedPassword,
      };

      localStorage.setItem("mainUserData", JSON.stringify(mainUserData));

      Cookies.set("token", token);

      document.location.reload();
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

      <TextFieldAuth
        placeholder={t("password")}
        type="password"
        methods={methods}
        registerName="password"
        options={{
          required: {
            value: true,
            message: t("enter password"),
          },

          onChange: () => methods.clearErrors("password"),
        }}
        error={methods.formState.errors.password?.message}
      />

      <Button
        className="w-full mt-4"
        type="submit"
        color="primary"
        title={loading ? t("loading") : "Вход"}
        disabled={loading}
      />
    </form>
  );
};
