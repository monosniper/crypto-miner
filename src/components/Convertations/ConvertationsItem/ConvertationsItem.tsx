import { FC } from "react";
import { ArrTopIcon } from "@/components/icons";
import styles from "./ConvertationsItem.module.css";
import { Convertation } from "@/types";
import { formatRelativeDate } from "@/utils";
import { useTranslation } from "react-i18next";
import { useGetCoinsQuery } from "@/redux/api/coinsApi";

type Props = {
  data: Convertation;
};

export const ConvertationsItem: FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const { data: coins } = useGetCoinsQuery(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h4>{t("conversion")}</h4>
        <p>{formatRelativeDate(new Date(data.created_at))}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.conversions}>
          <p>
            {data.amount.from.toFixed(2)}{" "}
            <span>
              {coins?.data.find((coin) => data.coin.from === coin.id)?.slug}
            </span>
          </p>

          {data.amount.to !== undefined && data.amount.to !== null && (
            <>
              <ArrTopIcon className="rotate-90 [&>path]:fill-purple-3" />

              <p>
                {data.amount.to.toFixed(2)}{" "}
                <span>
                  {coins?.data.find((coin) => data.coin.to === coin.id)?.slug}
                </span>
              </p>
            </>
          )}
        </div>

        {/* <p>$1,682.46</p> */}
      </div>
    </div>
  );
};
