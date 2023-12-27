import { Title, ReplenishmentForm } from "@/components";
import cn from "clsx";
import { useTranslation } from "react-i18next";

export const ReplenishmentPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Title className="flex lg:hidden pb-6" title={t("withdrawal-of-funds")} />

      <div className={cn("box", "p-6")}>
        <div className="flex justify-between items-center gap-3 flex-wrap text-lg font-medium">
          <h4>{t("enter the amount")}</h4>
        </div>

        <ReplenishmentForm className="mt-8" />
      </div>
    </div>
  );
};
