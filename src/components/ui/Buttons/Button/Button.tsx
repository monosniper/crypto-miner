import { FC, MouseEventHandler } from "react";
import styles from "./Button.module.css";
import cn from "clsx";
import { PropsWithClassName } from "@/types";

type Props = {
  type?: "button" | "submit";
  color?: "error" | "success" | "standart" | "primary";
  size?: "small" | "normal" | "big";
  icon?: JSX.Element | string;
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button: FC<PropsWithClassName<Props>> = ({
  className,
  type = "button",
  color = "standart",
  size = "normal",
  icon,
  title = "",
  onClick = () => alert("Click btn"),
}) => {
  return (
    <button
      className={cn(className, styles.btn, {
        [styles[size]]: size,
        [styles[color]]: color,
      })}
      type={type}
      onClick={onClick}
    >
      {icon && (
        <>
          {typeof icon === "string" ? <img src={icon} alt="btn-icon" /> : icon}
        </>
      )}

      <span>{title}</span>
    </button>
  );
};
