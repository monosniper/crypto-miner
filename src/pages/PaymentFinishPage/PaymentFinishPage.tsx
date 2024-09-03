import { Attention, Title } from "@/components";
import { Button } from "@/components/ui";
import { useTranslation } from "react-i18next";
import cn from "clsx";
import { CopyIcon } from "@/components/icons/CopyIcon";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./PaymentFinishPage.module.css";
import { useLazyPayedQuery } from "@/redux/api/userApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react";
import { copyText } from "@/utils";
import { useGetSettingsQuery } from "@/redux/api/mainApi";
import { useAppDispatch } from "@/redux/store";
import { setOpenModal } from "@/redux/slices/modalsOpensSlice";
import { NamesModals } from "@/types";
import { setText, setTitle } from "@/redux/slices/waitingModal";
import { CheckIcon } from "@/components/icons";

export const PaymentFinishPage = () => {
  const { t } = useTranslation();
  const { type } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [
    payed,
    { data: payedData, error: payedError, isLoading: payedIsLoading },
  ] = useLazyPayedQuery();
  const { data: settings } = useGetSettingsQuery(null);
  console.log(settings);
  const dispatch = useAppDispatch();

  const payedHandler = () => {
    payed({ orderId: Number(searchParams.get("orderId")) });
  };

  useEffect(() => {
    if (!payedData) return;

    dispatch(
      setOpenModal({
        isOpen: true,
        stateNameModal: NamesModals.isOpenWaitingModal,
      })
    );
    dispatch(setTitle(t("Thanks")));
    dispatch(
      setText(
        t(
          "After checking the funds transfer, the services will be linked to your account automatically"
        )
      )
    );
  }, [dispatch, payedData, t]);

  useEffect(() => {
    if (!payedError) return;

    toast.error(t("mistake"));
  }, [payedError, t]);

  return (
    <div>
      <div className="w-full lg:w-[560px] mx-auto flex flex-col gap-6">
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <Title title={t("payment-title")} />

          <p className="text-sm text-gray-1">
            Order ID: {searchParams.get("orderId")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className={cn("box", "p-6")}>
            <p className="text-lg font-medium base-content-200 flex items-center gap-2">
              Сумма{" "}
              {searchParams.get("status") &&
              searchParams.get("status") === "waiting" ? (
                <span className="text-yellow-500">{t("Please wait")}</span>
              ) : (
                <>
                  {searchParams.get("serverName")
                    ? `(${t("server")} - ${t(searchParams.get("serverName")!)})`
                    : ""}
                </>
              )}
              {searchParams.get("status") === "success" && (
                <>
                  <CheckIcon className="[&>g>path]:stroke-green-500" />{" "}
                  <span className="font-semibold text-green-500">
                    {t("The payment was successful")}
                  </span>
                </>
              )}
            </p>

            <div className="mt-4 flex justify-between items-center gap-4 flex-wrap">
              <p className="text-[28px] font-bold">
                {Number(searchParams.get("price")).toFixed(2)} USDT
              </p>

              <Button
                className={styles.changeMethodBtn}
                title={t("Change the payment method")}
                onClick={() =>
                  navigate(
                    `/wallet/payment?price=${searchParams.get(
                      "price"
                    )}&orderId=${searchParams.get("orderId")}`
                  )
                }
              />
            </div>
          </div>

          <div className={cn("box", "p-6")}>
            <div className="flex items-center flex-wrap gap-4">
              {type === "with-crypto" ? (
                <>
                  <p className="text-base font-semibold">
                    Сеть · TRON (TRC-20)
                  </p>
                  <p className="text-sm font-medium text-gray-1">
                    {t("payment-header-text")}
                  </p>
                </>
              ) : (
                <p className="text-base font-semibold">
                  {t("payment-with-card")}
                </p>
              )}
            </div>

            {type === "with-crypto" ? (
              <div className="flex items-start flex-col min-[600px]:flex-row min-[600px]:items-center gap-4 mt-4 overflow-hidden">
                {settings?.wallet_usdt && (
                  <QRCodeCanvas value={settings.wallet_usdt} />
                )}

                <div className="flex flex-col gap-3.5 w-full">
                  <p className="text-sm text-gray-1">
                    {t("payment-content-header")}
                  </p>

                  <div className="flex items-center gap-4 text-xl flex-wrap">
                    {settings?.wallet_usdt && (
                      <p className="truncate w-max">{settings?.wallet_usdt}</p>
                    )}
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        if (!settings?.wallet_usdt) return;

                        copyText(settings.wallet_usdt);

                        toast.success(t("the text has been copied"));
                      }}
                    >
                      <CopyIcon className="[&>g>path]:stroke-base-content-100" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-1 w-full">
                    {t("payment-content-text")}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 mt-4 lg:gap-8 flex-wrap">
                  <svg width="100" height="35" viewBox="0 0 100 35" fill="none">
                    <path
                      d="M7.02778 13.6879C7.02778 12.7887 7.91667 12.4429 9.38889 12.4429C11.5 12.4429 14.1667 12.9732 16.2778 13.9185V8.50041C13.9722 7.73957 11.6944 7.43985 9.38889 7.43985C3.75 7.43985 0 9.88374 0 13.9646C0 20.3279 10.5556 19.3135 10.5556 22.0571C10.5556 23.1176 9.44444 23.4635 7.88889 23.4635C5.58333 23.4635 2.63889 22.6796 0.305556 21.619V27.1062C2.88889 28.0285 5.5 28.4204 7.88889 28.4204C13.6667 28.4204 17.6389 26.0457 17.6389 21.9187C17.6111 15.0482 7.02778 16.2701 7.02778 13.6879ZM25.8056 2.82874L19.0278 4.02763L19 22.4951C19 25.9074 22.0833 28.4204 26.1944 28.4204C28.4722 28.4204 30.1389 28.0746 31.0556 27.6596V22.9793C30.1667 23.279 25.7778 24.3396 25.7778 20.9274V12.7426H31.0556V7.8318H25.7778L25.8056 2.82874ZM39.6944 9.53791L39.25 7.8318H33.25V28.0054H40.1944V14.3335C41.8333 12.5582 44.6111 12.881 45.4722 13.1346V7.8318C44.5833 7.55513 41.3333 7.04791 39.6944 9.53791ZM47.1667 7.8318H54.1389V28.0054H47.1667V7.8318ZM47.1667 6.07957L54.1389 4.83457V0.154297L47.1667 1.37624V6.07957ZM68.6389 7.43985C65.9167 7.43985 64.1667 8.50041 63.1944 9.23818L62.8333 7.80874H56.7222V34.6915L63.6667 33.4696L63.6944 26.9449C64.6945 27.5443 66.1667 28.3974 68.6111 28.3974C73.5833 28.3974 78.1111 25.0773 78.1111 17.7687C78.0833 11.0826 73.5 7.43985 68.6389 7.43985ZM66.9722 23.3251C65.3333 23.3251 64.3611 22.841 63.6944 22.2415L63.6667 13.6879C64.3889 13.0193 65.3889 12.5582 66.9722 12.5582C69.5 12.5582 71.25 14.9099 71.25 17.9301C71.25 21.0196 69.5278 23.3251 66.9722 23.3251ZM100 17.9993C100 12.0971 96.5556 7.43985 89.9722 7.43985C83.3611 7.43985 79.3611 12.0971 79.3611 17.9532C79.3611 24.8929 84.0833 28.3974 90.8611 28.3974C94.1667 28.3974 96.6667 27.7749 98.5555 26.8987V22.2876C96.6667 23.0715 94.5 23.5557 91.75 23.5557C89.0556 23.5557 86.6667 22.7718 86.3611 20.0512H99.9444C99.9444 19.7515 100 18.5526 100 17.9993ZM86.2778 15.809C86.2778 13.2037 88.1944 12.1201 89.9444 12.1201C91.6389 12.1201 93.4444 13.2037 93.4444 15.809H86.2778Z"
                      fill="#6772E5"
                    />
                  </svg>

                  <Button title={t("Proceed to payment")} color="primary" />
                </div>

                <p className="text-sm text-gray-1 mt-4">
                  {t("payment-content-text")}
                </p>
              </>
            )}

            {type === "with-crypto" &&
              searchParams.get("status") !== "success" && (
                <Button
                  className={cn("mt-6", {
                    "!bg-none !bg-yellow-700": Boolean(
                      searchParams.get("status") &&
                        searchParams.get("status") === "waiting"
                    ),
                  })}
                  title={payedIsLoading ? t("loading") : t("Я оплатил(а)")}
                  color="primary"
                  onClick={payedHandler}
                  disabled={
                    payedIsLoading ||
                    Boolean(
                      searchParams.get("status") &&
                        searchParams.get("status") === "waiting"
                    )
                  }
                />
              )}
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
