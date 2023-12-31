import { FC } from "react";
import { ArrTopIcon } from "@/components/icons";
import styles from "./ConvertationsItem.module.css";
import { Convertation } from "@/types";
import { formatRelativeDate } from "@/utils";
import { useTranslation } from "react-i18next";

type Props = {
  data: Convertation;
};

export const ConvertationsItem: FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h4>{t("conversion")}</h4>
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
