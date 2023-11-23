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
} from "react";
import { useLoading, useOutside } from "@/hooks";
import { useTranslation } from "react-i18next";

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
      {!loading ? (
        <>
          {notifications?.data && notifications.data.length > 0 && (
            <div className={styles.list}>
              {notifications?.data.map((el) => {
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
    </div>
  );
};
