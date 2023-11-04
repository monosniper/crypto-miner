import { PropsWithClassName } from "@/types";
import { FC, MouseEventHandler } from "react";
import cn from "clsx";
import styles from "./ShowMoreBtn.module.css";

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  title?: string;
  isOpen?: boolean;
};

export const ShowMoreBtn: FC<PropsWithClassName<Props>> = ({
  className,
  onClick,
  title = "Показать больше",
  isOpen = false,
}) => {
  return (
    <button className={cn(className, styles.btn)} onClick={onClick}>
      <span>{title}</span>
      <svg
        className={cn({
          "rotate-180": isOpen,
        })}
        width="9"
        height="6"
        viewBox="0 0 9 6"
        fill="none"
      >
        <path
          d="M1 1.25L4.5 4.75L8 1.25"
          stroke="black"
          strokeWidth="1.16667"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
