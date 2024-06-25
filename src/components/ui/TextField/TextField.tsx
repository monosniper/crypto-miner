import { ChangeEventHandler, MouseEventHandler } from "react";
import styles from "./TextField.module.css";
import {
  Path,
  RegisterOptions,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { PropsWithClassName } from "@/types";
import cn from "clsx";
import PhoneInput from "react-phone-number-input";

type Props<T extends FieldValues> = {
  type?: "text" | "password" | "number" | "email" | "tel";
  placeholder?: string;
  methods?: UseFormReturn<T>;
  registerName?: Path<T>;
  options?: RegisterOptions;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  error?: string;
  readOnly?: boolean;

  btn?: {
    title: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
  };

  rightBlock?: JSX.Element;
};

export const TextField = <T extends FieldValues>({
  className,
  type = "text",
  placeholder,
  methods,
  registerName,
  options,
  onChange,
  value,
  readOnly,
  rightBlock,

  btn,
}: PropsWithClassName<Props<T>>) => {
  if (type === "tel") {
    return (
      <div className={cn(className, styles.wrapper)}>
        <PhoneInput
          className={cn(styles.input, styles.tel)}
          international
          defaultCountry="RU"
          type={type}
          placeholder={placeholder}
          readOnly={readOnly}
          {...methods?.register(registerName!, options)}
          onChange={() => console.log()}
        />

        {!rightBlock && btn && (
          <button className={styles.btn} type="button" onClick={btn.onClick}>
            {btn.title}
          </button>
        )}

        {rightBlock && !btn && rightBlock}
      </div>
    );
  }

  return (
    <div className={cn(className, styles.wrapper)}>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        readOnly={readOnly}
        {...methods?.register(registerName!, options)}
      />

      {!rightBlock && btn && (
        <button className={styles.btn} type="button" onClick={btn.onClick}>
          {btn.title}
        </button>
      )}

      {rightBlock && !btn && rightBlock}
    </div>
  );
};
