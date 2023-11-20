import { Attention, BalanceBlock, Title, WithdrawalForm } from "@/components";
import { useDate } from "@/hooks";
import cn from "clsx";
import { useTranslation } from "react-i18next";

export const WithdrawalPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Title className="flex lg:hidden pb-6" title={t("withdrawal-of-funds")} />

      <BalanceBlock type="withdrawal" title={t("available-for-output")} />

      <div className={cn("box", "p-6 mt-6")}>
        <div className="flex justify-between items-center gap-3 flex-wrap text-lg font-medium">
          <h4>{t("enter-the-amount-and-wallet-address")}</h4>
        </div>

        <WithdrawalForm className="mt-8" />
      </div>

      <Attention
        className="mt-6 p-6"
        title={t("pay-attention")}
        content={<AttentionContent />}
      />
    </div>
  );
};

const AttentionContent = () => {
  const { t } = useTranslation();
  const { getDateNextDayWeek, formattedDateStr } = useDate();

  return (
    <>
      <div>
        <p>
          {t(
            "trust our reliable payments that are made every friday. The next payment is scheduled for",
          )}
        </p>
        <ul className="ml-4 list-disc">
          <li>{formattedDateStr(getDateNextDayWeek(5))}</li>
        </ul>
      </div>

      <p>
        {t(
          "our payments are always made on time, so you can be sure that you will receive your money on time. We understand that it is important for you to receive your salary on time, so we do everything possible to ensure the timeliness and reliability of our payments",
        )}
      </p>
    </>
  );
};
