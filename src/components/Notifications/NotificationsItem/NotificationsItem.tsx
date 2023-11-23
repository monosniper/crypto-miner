import { Notification } from "@/types";
import styles from "./NotificationsItem.module.css";
import { FC } from "react";

type Props = {
  data: Notification;
};

export const NotificationsItem: FC<Props> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}></div>

      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <h4>{data.title}</h4>

          {data.link && (
            <a
              className="text-primary border-b border-b-transparent hover:border-b-primary ease-linear duration-200"
              href={data.link}
            >
              Подробнее
            </a>
          )}
        </div>

        <p>{data.content}</p>
      </div>
    </div>
  );
};
