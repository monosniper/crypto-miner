import { FC } from "react";
import { WithdrawsItem as WithdrawsItemTypes } from "@/types";
import { formatRelativeDate } from "@/utils";
import { useTranslation } from "react-i18next";

type Props = {
  data: WithdrawsItemTypes;
};

export const WithdrawsItem: FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="box p-4">
      <p>{t("asd")}</p>

      <div className="flex items-center justify-between mt-4">
        <p className="text-lg font-medium">
          {data.amount} <span className="text-base-content-300">USDT</span>
        </p>

        <p className="text-xs text-base-content-300">
          {formatRelativeDate(new Date(data.created_at))}
        </p>
      </div>
    </div>
  );
};
