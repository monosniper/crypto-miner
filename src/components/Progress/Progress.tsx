import styles from "./Progress.module.css";

export const Progress = () => {
  return (
    <div className={styles.wrapper}>
      <span className="z-10">0$</span>

      <span className="z-10">49%</span>

      <span className="z-10">1000$</span>
    </div>
  );
};
