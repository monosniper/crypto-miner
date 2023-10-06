import { Link } from "react-router-dom";
import styles from "./NewsItem.module.css";
import cn from "clsx";

export const NewsItem = () => {
  return (
    <div className={styles.wrapper}>
      <div className="flex gap-4 items-center">
        <img className={styles.avatar} src="/images/avatar.png" alt="avatar" />
        <h4 className={cn(styles.title, "375:hidden")}>Никита Красов</h4>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h4 className={cn(styles.title, "hidden 375:inline-block")}>
            Никита Красов
          </h4>
          <div className={styles.headerAccount}>
            <p>Пополнил ваш счёт</p>
            <p>только что</p>
          </div>
        </div>

        <p className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboriis
        </p>

        <div className={styles.footer}>
          <p>
            +1.94 <span>BTC</span>
          </p>
          <Link to="/">Открыть кошелёк</Link>
        </div>
      </div>
    </div>
  );
};
