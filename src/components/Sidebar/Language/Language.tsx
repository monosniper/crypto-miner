import styles from "./Language.module.css";

export const Language = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.select}>
        <span>Русский</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="6"
          viewBox="0 0 8 6"
          fill="none"
        >
          <path
            d="M1 1.25L4.5 4.75L8 1.25"
            stroke="black"
            strokeWidth="1.16667"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className={styles.list}>
        <div>Русский</div>
        <div>English</div>
      </div>
    </div>
  );
};
