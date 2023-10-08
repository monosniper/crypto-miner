import { ArrTopIcon } from "@/components/icons";
import styles from "./ConversionsItem.module.css";

export const ConversionsItem = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h4>Вывод средств</h4>
        <p>только что</p>
      </div>

      <div className={styles.content}>
        <div className={styles.conversions}>
          <p>
            1.053 <span>ETH</span>
          </p>

          <ArrTopIcon className="rotate-90 [&>path]:fill-purple-3" />

          <p>
            1.053 <span>ETH</span>
          </p>
        </div>

        <p>$1,682.46</p>
      </div>
    </div>
  );
};
