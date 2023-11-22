import { FC } from "react";
import {
  WithdrawalStatuses,
  WithdrawsItem as WithdrawsItemTypes,
} from "@/types";
import { formatRelativeDate } from "@/utils";
import { useTranslation } from "react-i18next";
import cn from "clsx";

type Props = {
  data: WithdrawsItemTypes;
};

export const WithdrawsItem: FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <div
      className={cn("box p-4", {
        "!bg-red-100": data.status === WithdrawalStatuses.FAILED,
        "!bg-yellow-100": data.status === WithdrawalStatuses.PENDING,
        "!bg-green-100": data.status === WithdrawalStatuses.SUCCESS,
      })}
    >
      <h4 className="text-sm">{t(data.status)}</h4>

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
