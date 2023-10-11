import { FC, MouseEventHandler } from "react";
import styles from "./Buy.module.css";
import cn from "clsx";
import { PropsWithClassName } from "@/types";
import { CartIcon } from "@/components/icons";

type Props = {
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const Buy: FC<PropsWithClassName<Props>> = ({
  className,
  title,
  onClick,
}) => {
  return (
    <button className={cn(className, "box", styles.wrapper)} onClick={onClick}>
      <div className={styles.inner}>
        <CartIcon />
        <span>{title}</span>
      </div>
    </button>
  );
};
