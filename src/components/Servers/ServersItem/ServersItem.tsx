import { FC, MouseEventHandler } from "react";
import styles from "./ServersItem.module.css";
import cn from "clsx";
import { PropsWithClassName, Server, ServerStatuses } from "@/types";
import { FanIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import { getServerStatus } from "@/data";

type Props = {
  type?: "mining" | "standart";
  onClick?: MouseEventHandler<HTMLElement>;
  data: Server;
  selected?: boolean;
  disabled?: boolean;
};

export const ServersItem: FC<PropsWithClassName<Props>> = ({
  className,
  type = "standart",
  onClick,
  data,
  selected,
  disabled = false,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        className,
        "box cursor-pointer border border-transparent border-solid relative overflow-hidden",
        styles.wrapper,
        {
          "hover:border hover:border-primary": type === "standart",
          "border !border-primary border-solid": selected,
        },
      )}
      onClick={onClick}
    >
      <div className={styles.header}>
        <div
          className={cn(styles.state, {
            [styles.notActive]:
              data.status === ServerStatuses.NOT_ACTIVE_STATUS,
            [styles.reload]: data.status === ServerStatuses.RELOAD_STATUS,
          })}
        >
          <FanIcon
            className={cn({
              "animate-spin": data.status === ServerStatuses.WORK_STATUS,
            })}
          />

          <p>{t(getServerStatus(data.status as ServerStatuses))}</p>
        </div>
      </div>

      {data.server_user_name && (
        <h4 className={styles.title}>{data.server_user_name}</h4>
      )}

      <h5 className={styles.title}>{data.title}</h5>

      {disabled && (
        <div className="absolute left-0 right-0 top-0 bottom-0 w-full h-full bg-black/30 cursor-not-allowed"></div>
      )}
    </div>
  );
};
