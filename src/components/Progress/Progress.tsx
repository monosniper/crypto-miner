import { FC } from "react";
import styles from "./Progress.module.css";

type Props = {
  total: number;
};

export const Progress: FC<Props> = ({ total }) => {
  const progressPercentage = Math.min((total / 1000) * 100, 100);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.totalProgress}
        style={{ width: `${progressPercentage}%` }}
      ></div>

      <span className="z-10">0$</span>

      <span className="z-10">49%</span>

      <span className="z-10">1000$</span>
    </div>
  );
};
