import { FC } from "react";
import { ArrTopIcon } from "@/components/icons";
import styles from "./ConversionsItem.module.css";
import { Conversion } from "@/types";
import { formatRelativeDate } from "@/utils";

type Props = {
  data: Conversion;
};

export const ConversionsItem: FC<Props> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h4>Вывод средств</h4>
        <p>{formatRelativeDate(new Date(data.created_at))}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.conversions}>
          <p>
            {data.amount.from.toFixed(2)} <span>{data.coin.from}</span>
          </p>

          {data.amount.to !== undefined && data.amount.to !== null && (
            <>
              <ArrTopIcon className="rotate-90 [&>path]:fill-purple-3" />

              <p>
                {data.amount.to.toFixed(2)} <span>{data.coin.to}</span>
              </p>
            </>
          )}
        </div>

        {/* <p>$1,682.46</p> */}
      </div>
    </div>
  );
};
