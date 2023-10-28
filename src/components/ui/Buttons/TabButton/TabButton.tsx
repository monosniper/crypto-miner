import { FC, MouseEventHandler } from "react";
import styles from "./TabButton.module.css";
import cn from "clsx";
import { PropsWithClassName } from "@/types";

type Props = {
  selected?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title: string;
};

export const TabButton: FC<PropsWithClassName<Props>> = ({
  className,
  selected,
  onClick,
  title = "",
}) => {
  return (
    <button
      className={cn(className, styles.btn, {
        [styles.active]: selected,
      })}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
