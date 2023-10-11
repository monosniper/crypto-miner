import { FC, ReactNode } from "react";
import styles from "./FieldWrapper.module.css";
import { PropsWithClassName } from "@/types";
import cn from "clsx";

type Props = {
  children: ReactNode;
  title: string;
  error?: string;
};

export const FieldWrapper: FC<PropsWithClassName<Props>> = ({
  className,
  children,
  title,
  error,
}) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <p className={styles.title}>{title}</p>

      {children}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
