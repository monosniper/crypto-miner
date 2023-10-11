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

type Props<T extends FieldValues> = {
  type?: "text" | "password" | "number";
  placeholder?: string;
  methods?: UseFormReturn<T>;
  registerName?: Path<T>;
  options?: RegisterOptions;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  error?: string;

  btn?: {
    title: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
  };
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

  btn,
}: PropsWithClassName<Props<T>>) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...methods?.register(registerName!, options)}
      />

      {btn && (
        <button className={styles.btn} type="button" onClick={btn.onClick}>
          {btn.title}
        </button>
      )}
    </div>
  );
};
