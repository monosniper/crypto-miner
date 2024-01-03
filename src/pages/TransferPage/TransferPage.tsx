import { Title, TransferForm } from "@/components";
import { useTranslation } from "react-i18next";
import cn from "clsx";

export const TransferPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Title className="flex lg:hidden pb-6" title={t("conversions")} />
      </div>

      <div className={cn("box", "p-6")}>
        <div className="flex justify-between items-center gap-3 flex-wrap text-lg font-medium">
          <h4>{t("enter the amount")}</h4>
        </div>

        <TransferForm className="mt-8" />
      </div>
    </div>
  );
};
