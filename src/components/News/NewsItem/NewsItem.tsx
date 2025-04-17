import { Link } from "react-router-dom";
import styles from "./NewsItem.module.css";
import cn from "clsx";
import { News } from "@/types";
import { FC } from "react";
import { LogoIcon } from "@/components/icons";

type Props = {
  data: News;
};

export const NewsItem: FC<Props> = ({ data }) => {
  const maxContentLength = 300; // Установите максимальную длину контента по вашему усмотрению
  const truncatedContent = data.content.slice(0, maxContentLength);
  const contentObj = { __html: truncatedContent + "..." };

  return (
    <div className={styles.wrapper}>
      <div className="flex gap-4 items-center">
        <LogoIcon />
        <h4 className={cn(styles.title, "375:hidden")}>{data.title}</h4>
      </div>

      <div className={styles.inner}>
        <div className={styles.header}>
          <h4 className={cn(styles.title, "hidden 375:inline-block")}>
            {data.title}
          </h4>
          {/* <div className={styles.headerAccount}>
            <p>Пополнил ваш счёт</p>
            <p>только что</p>
          </div> */}
        </div>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={contentObj}
        ></div>

        <div className={styles.footer}>
          {/* <p>
            +1.94 <span>BTC</span>
          </p> */}
          <Link
            className="justify-items-end ml-auto"
            to={`${import.meta.env.VITE_LANDING_URL}/blog-details/${data.id}`}
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};
