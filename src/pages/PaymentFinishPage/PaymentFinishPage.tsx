import { Attention, Title } from "@/components";
import { Button } from "@/components/ui";
import { useTranslation } from "react-i18next";
import cn from "clsx";
import { CopyIcon } from "@/components/icons/CopyIcon";

export const PaymentFinishPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="w-full lg:w-[560px] mx-auto flex flex-col gap-6">
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <Title title={t("payment-title")} />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className={cn("box", "p-6")}>
            <p className="text-lg font-medium base-content-200">
              Сумма (Сервер - Максимальный)
            </p>

            <p className="text-[28px] font-bold mt-4">99.01 USDT</p>
          </div>

          <div className={cn("box", "p-6")}>
            <div className="flex items-center flex-wrap gap-4">
              <p className="text-base font-semibold">Сеть · TRON (TRC-20)</p>
              <p className="text-sm font-medium text-gray-1">
                {t("payment-header-text")}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <img src="/images/qr.png" alt="qr" />

              <div className="flex flex-col gap-3.5">
                <p className="text-sm text-gray-1">
                  {t("payment-content-header")}
                </p>

                <div className="flex items-center gap-4 text-xl">
                  <p>TUPr4wqgqqUDXnt5VdUn3Px15W...</p>
                  <div className="cursor-pointer">
                    <CopyIcon className="[&>g>path]:stroke-base-content-100" />
                  </div>
                </div>
                <p className="text-sm text-gray-1">
                  {t("payment-content-text")}
                </p>
              </div>
            </div>

            <Button
              className="mt-6"
              title={t("Я оплатил(а)")}
              color="primary"
            />
          </div>

          <Attention className="p-6" content={<AttentionContent />} />
        </div>
      </div>
    </div>
  );
};

const AttentionContent = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-center gap-4 text-xs justify-center">
        <p>{t("payment-attention")}</p>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path
            d="M12.6526 0.260742C19.5074 0.260742 25.1526 5.9059 25.1526 12.7607C25.1526 19.666 19.5074 25.2607 12.6526 25.2607C5.74735 25.2607 0.152588 19.666 0.152588 12.7607C0.152588 5.9059 5.74735 0.260742 12.6526 0.260742ZM18.3986 8.77889C18.449 8.62768 18.449 8.47647 18.3986 8.27485C18.3986 8.17405 18.2977 8.02284 18.2473 7.97244C18.0961 7.82123 17.8441 7.82123 17.7433 7.82123C17.2897 7.82123 16.5336 8.07324 13.0558 9.53493C11.8461 10.039 9.42678 11.047 5.79775 12.6599C5.19291 12.912 4.89049 13.1136 4.84009 13.3656C4.78968 13.7688 5.44493 13.92 6.20097 14.172C6.85622 14.3736 7.71307 14.6257 8.1667 14.6257C8.56993 14.6257 9.02356 14.4745 9.52759 14.1216C12.9046 11.8031 14.6687 10.6438 14.7695 10.6438C14.8703 10.6438 14.9711 10.5934 15.0215 10.6438C15.1223 10.7446 15.1223 10.8454 15.0719 10.8958C15.0215 11.1478 11.8461 14.0712 11.6445 14.2728C10.9389 14.9785 10.1324 15.4321 11.3925 16.2386C12.451 16.9442 13.0558 17.3978 14.1647 18.1035C14.8703 18.5571 15.4248 19.1115 16.1304 19.0611C16.4832 19.0107 16.8361 18.7083 16.9873 17.7507C17.4409 15.5833 18.2473 10.7446 18.3986 8.77889Z"
            fill="white"
          />
        </svg>
      </div>
    </>
  );
};
