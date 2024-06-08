import { FC, MouseEventHandler } from "react";
import styles from "./ServersItem.module.css";
import cn from "clsx";
import { Preset, PropsWithClassName, ServerStatuses } from "@/types";
import { FanIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import { getServerStatus } from "@/data";

type Props = {
  type?: "mining" | "standart";
  onClick?: MouseEventHandler<HTMLElement>;
  data: Preset & { status: ServerStatuses };
  selected?: boolean;
  disabled?: boolean;
  inWork?: boolean;
  tooltip?: {
    value: boolean;
    title: string;
  };
};

export const ServersItem: FC<PropsWithClassName<Props>> = ({
  className,
  type = "standart",
  onClick,
  data,
  selected,
  disabled = false,
  inWork = false,
  tooltip,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className="relative"
      data-tooltip-id={tooltip?.value ? "mining-server" : undefined}
      data-tooltip-content={tooltip?.title}
      data-tooltip-place="top"
    >
      <div
        className={cn({
          "box-in-work absolute -left-[1px] right-0 -top-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] bottom-0 rounded-xl":
            inWork,
        })}
      ></div>
      <div
        className={cn(
          className,
          "box cursor-pointer border border-transparent border-solid relative overflow-hidden",
          styles.wrapper,
          {
            "hover:border hover:border-primary": type === "standart",
            "border !border-primary border-solid": selected,
          }
        )}
        onClick={onClick}
      >
        <div className={styles.header}>
          <div
            className={cn(styles.state, {
              [styles.notActive]:
                data.status === ServerStatuses.NOT_ACTIVE_STATUS,
              // [styles.reload]: data.status === ServerStatuses.RELOAD_STATUS,
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

        {/* {data.name && <h4 className={styles.title}>{data.name}</h4>} */}

        <h5 className={styles.title}>{data?.title}</h5>

        {disabled && (
          <div className="absolute left-0 right-0 top-0 bottom-0 w-full h-full bg-black/30 cursor-not-allowed"></div>
        )}
      </div>
    </div>
  );
};
