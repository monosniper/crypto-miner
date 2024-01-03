import { PropsWithClassName } from "@/types";
import cn from "clsx";
import { FC } from "react";
import styles from "./Attention.module.css";

type Props = {
  title?: string;
  content: JSX.Element;
};

export const Attention: FC<PropsWithClassName<Props>> = ({
  className,
  title = "",
  content,
}) => {
  return (
    <div
      className={cn(
        className,
        "box",
        "!border-base-border-warning !bg-warning",
      )}
    >
      {title && (
        <div className="flex items-center gap-2">
          <img
            className="w-6 h-6"
            src="/images/attention.png"
            alt="attention"
          />

          <p className={styles.title}>{title}</p>
        </div>
      )}

      <div
        className={cn(styles.content, {
          "mt-0": !title,
        })}
      >
        {content}
      </div>
    </div>
  );
};
