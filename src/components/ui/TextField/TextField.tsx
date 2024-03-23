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
