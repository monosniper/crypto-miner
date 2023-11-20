import { FC, MouseEventHandler } from "react";
import styles from "./ServersItem.module.css";
import cn from "clsx";
import { PropsWithClassName, Server, ServerStatuses } from "@/types";
import { FanIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import { getServerStatus } from "@/data";

type Props = {
  type?: "div" | "button";
  onClick?: MouseEventHandler<HTMLElement>;
  data: Server;
};

export const ServersItem: FC<PropsWithClassName<Props>> = ({
  className,
  type = "div",
  onClick,
  data,
}) => {
  const Tag = type;
  const { t } = useTranslation();

  return (
    <Tag
      className={cn(className, "box", styles.wrapper, {
        "cursor-pointer hover:border hover:border-primary border border-transparent border-solid":
          type === "button",
        "border !border-primary border-solid": data.isHot === 1,
      })}
      onClick={onClick}
    >
      <div className={styles.header}>
        <div className={styles.state}>
          <FanIcon
            className={cn({
              "animate-spin": data.status === ServerStatuses.WORK_STATUS,
            })}
          />

          <p>{t(getServerStatus(data.status as ServerStatuses))}</p>
        </div>
      </div>

      <h5 className={styles.title}>{data.title}</h5>
    </Tag>
  );
};
