import styles from "./NotificationSkelet.module.css";

export const NotificationSkelet = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}></div>

      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <h4></h4>

          <a
            className="text-primary border-b border-b-transparent hover:border-b-primary ease-linear duration-200"
            href="#"
          ></a>
        </div>

        <div className="flex flex-col gap-2">
          <p></p>

          <p></p>
        </div>
      </div>
    </div>
  );
};
