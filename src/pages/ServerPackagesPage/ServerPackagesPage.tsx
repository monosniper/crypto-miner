import { useRef } from "react";
import { Attention, ServersPlans, Title } from "@/components";
import { useTranslation } from "react-i18next";

export const ServerPackagesPage = () => {
  const plansRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  return (
    <div>
      <Title className="flex lg:hidden pb-6" title={t("available plans")} />

      <Attention
        className="p-6"
        title={t("pay-attention")}
        content={<AttentionContent />}
      />

      <div className="mt-16" ref={plansRef}>
        <ServersPlans />
      </div>
    </div>
  );
};

const AttentionContent = () => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <p>
          {t(
            "servers of the same plan can be launched simultaneously, this will give a multiple boost to the farm",
          )}
        </p>
      </div>
    </>
  );
};
