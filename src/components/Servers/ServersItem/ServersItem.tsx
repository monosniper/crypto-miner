import { FC, MouseEventHandler } from "react";
import styles from "./ServersItem.module.css";
import cn from "clsx";
import { PropsWithClassName } from "@/types";
import { FanIcon } from "@/components/icons";

type Props = {
  type?: "div" | "button";
  onClick?: MouseEventHandler<HTMLElement>;
};

export const ServersItem: FC<PropsWithClassName<Props>> = ({
  className,
  type = "div",
  onClick,
}) => {
  const Tag = type;

  return (
    <Tag
      className={cn(className, "box", styles.wrapper, {
        "cursor-pointer hover:border hover:border-primary border border-transparent border-solid":
          type === "button",
      })}
      onClick={onClick}
    >
      <div className={styles.header}>
        <div className={styles.state}>
          <FanIcon />

          <p>Работает</p>
        </div>
      </div>

      <h5 className={styles.title}>Antminer S19 XP 141</h5>
    </Tag>
  );
};
