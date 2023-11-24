import { useGetNotificationsQuery } from "@/redux/api/userApi";
import styles from "./Notifications.module.css";
import { EmptyText, NotificationSkelet, NotificationsItem } from "..";
import {
  Dispatch,
  FC,
  MouseEvent,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { useLoading, useOutside } from "@/hooks";
import { useTranslation } from "react-i18next";
import cn from "clsx";

type Props = {
  setOpen?: Dispatch<SetStateAction<boolean>>;
  openBtnRef?: RefObject<HTMLDivElement>;
};

export const Notifications: FC<Props> = ({ setOpen, openBtnRef }) => {
  const {
    data: notifications,
    isLoading: isLoading,
    isFetching: isFetching,
    isError,
  } = useGetNotificationsQuery(null);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  useOutside(ref, (e: MouseEvent<HTMLDivElement>) => {
    if (!setOpen) return;

    if (!openBtnRef) {
      return setOpen(false);
    }

    if (openBtnRef.current && e.target !== openBtnRef.current) {
      return setOpen(false);
    }
  });

  const loading = useLoading(isLoading, isFetching);

  return (
    <div className={styles.wrapper} ref={ref}>
      <h6 className={styles.title}>{t("notifications")}</h6>

      {!loading ? (
        <>
          {notifications?.data && notifications.data.length > 0 && (
            <div
              className={cn(styles.list, {
                "overflow-y-auto max-h-[375px]": showAll,
              })}
            >
              {notifications?.data
                .slice(0, showAll ? undefined : 5)
                .map((el) => {
                  return <NotificationsItem key={el.id} data={el} />;
                })}
            </div>
          )}

          {isError && !notifications?.data && (
            <div className="flex w-full">
              <EmptyText text={t("couldn't get alerts")} />
            </div>
          )}

          {notifications?.data && notifications.data.length === 0 && (
            <div className="flex w-full">
              <EmptyText text={t("no alerts")} />
            </div>
          )}
        </>
      ) : (
        <div className={styles.list}>
          <NotificationSkelet />
          <NotificationSkelet />
          <NotificationSkelet />
          <NotificationSkelet />
          <NotificationSkelet />
        </div>
      )}

      {notifications && notifications.data.length > 5 && (
        <div
          className="text-center cursor-pointer"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? t("roll-up") : t("show all")}
        </div>
      )}
    </div>
  );
};
