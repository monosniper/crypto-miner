import { Title } from "@/components";
import { useTranslation } from "react-i18next";

export const RefPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Title className="flex lg:hidden pb-6" title={t("conversions")} />
      </div>
    </div>
  );
};
