import {
  ReplenishmentItem as ReplenishmentItemTypes,
  ReplenishmentStatuses,
} from "@/types";
import { FC } from "react";
import cn from "clsx";
import { useTranslation } from "react-i18next";
import { CheckIcon, CloseIcon, TimeIcon } from "../icons";
import { useNavigate } from "react-router-dom";

type Props = {
  data: ReplenishmentItemTypes;
};

export const ReplenishmentItem: FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const clickHandler = () => {
    if (data.status === ReplenishmentStatuses.WAITING) {
      return navigate(
        `/wallet/payment/finish/with-crypto?price=${data.amount}&status=waiting&orderId=${data.purchase_id}`
      );
    }

    if (data.status === ReplenishmentStatuses.FINISHED) {
      return navigate(
        `/wallet/payment/finish/with-crypto?price=${data.amount}&status=success&orderId=${data.purchase_id}`
      );
    }
  };

  return (
    <div
      className={cn("box p-4 text-base-content-100 cursor-pointer")}
      onClick={clickHandler}
    >
      <div className="flex items-center gap-2">
        {data.status === ReplenishmentStatuses.FAILED && (
          <CloseIcon className="[&>path]:fill-red-500" width={20} height={20} />
        )}

        {data.status === ReplenishmentStatuses.FINISHED && (
          <CheckIcon
            className="[&>g>path]:stroke-success"
            width={20}
            height={20}
          />
        )}

        {data.status === ReplenishmentStatuses.WAITING && (
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

        <p className="text-xs text-base-content-100"></p>
      </div>
    </div>
  );
};
