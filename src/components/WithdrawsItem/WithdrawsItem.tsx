import { FC } from "react";
import {
  WithdrawalStatuses,
  WithdrawsItem as WithdrawsItemTypes,
} from "@/types";
import { formatRelativeDate } from "@/utils";
import { useTranslation } from "react-i18next";
import cn from "clsx";
import { CheckIcon, CloseIcon, TimeIcon } from "../icons";

type Props = {
  data: WithdrawsItemTypes;
};

export const WithdrawsItem: FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <div className={cn("box p-4 text-base-content-100")}>
      <div className="flex items-center gap-2">
        {data.status === WithdrawalStatuses.FAILED && (
          <CloseIcon className="[&>path]:fill-red-500" width={20} height={20} />
        )}

        {data.status === WithdrawalStatuses.SUCCESS && (
          <CheckIcon
            className="[&>g>path]:stroke-success"
            width={20}
            height={20}
          />
        )}

        {data.status === WithdrawalStatuses.PENDING && (
          <TimeIcon
            className="[&>g>path]:stroke-yellow-500 [&>g>circle]:stroke-yellow-500"
            width={20}
            height={20}
          />
        )}

        <h4 className="text-sm">{t(data.status)}</h4>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-lg font-medium">
          {data.amount} <span className="text-base-content-100">USDT</span>
        </p>

        <p className="text-xs text-base-content-100">
          {formatRelativeDate(new Date(data.created_at))}
        </p>
      </div>
    </div>
  );
};
