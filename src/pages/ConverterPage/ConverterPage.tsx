import { Attention, Title } from "@/components";
import { Button, TextField, TextFieldSelect } from "@/components/ui";
import { useGetCoinsQuery } from "@/redux/api/coinsApi";
import { useGetSettingsQuery } from "@/redux/api/mainApi";
import {
  useConvertationMutation,
  useGetWalletQuery,
} from "@/redux/api/userApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const ConverterPage = () => {
  const { t } = useTranslation();
  const [convertation, { data, isError, isLoading }] =
    useConvertationMutation();
  const { data: coins } = useGetCoinsQuery(null);
  const { data: settings } = useGetSettingsQuery(null);
  const { data: walletData } = useGetWalletQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const methods = useForm<{ amount?: number; amountTwo?: number }>();
  const [fromCoinId, setFromCoinId] = useState<number>();
  const [toCoinId, setToCoinId] = useState<number>();
  const [formatCoins, setFormatCoins] = useState<
    { title: string; value: number }[]
  >([]);

  useEffect(() => {
    if (!coins) return;

    const coinsForSelects = coins.data.map((coin) => {
      return {
        title: coin.slug,
        value: coin.id,
      };
    });

    setFormatCoins(coinsForSelects);
  }, [coins]);

  useEffect(() => {
    if (formatCoins.length > 0) {
      setFromCoinId(formatCoins[0].value);
      setToCoinId(formatCoins[0].value);
    }
  }, [formatCoins]);

  const formHandler = (data: { amount?: number; amountTwo?: number }) => {
    if (!data.amount) {
      return toast.error(t("enter the amount"));
    }

    const coin = coins?.data.find((el) => el.id === fromCoinId);

    if (!coin) return;

    const balanceCoin = walletData?.data.balance[coin.slug];

    if (balanceCoin && balanceCoin < data.amount) {
      return toast.error(t("insufficient funds"));
    }

    if (data.amount && fromCoinId && toCoinId) {
      convertation({
        coin_from_id: fromCoinId,
        coin_to_id: toCoinId,
        amount: data.amount,
      });
    }
  };

  useEffect(() => {
    if (!data) return;

    if (!data.success) {
      toast.error(t("insufficient funds"));

      return;
    }

    toast.success(t("success"));

    methods.setValue("amount", undefined);
    methods.setValue("amountTwo", undefined);
  }, [data, methods, t]);

  useEffect(() => {
    if (!isError) return;

    toast.error("mistake");
  }, [isError]);

  useEffect(() => {
    if (coins && fromCoinId && toCoinId) {
      const fromCoin = coins.data.find((coin) => coin.id === fromCoinId);
      const toCoin = coins.data.find((coin) => coin.id === toCoinId);

      if (
        walletData &&
        fromCoin?.rate &&
        toCoin?.rate &&
        settings?.convertation_fee
      ) {
        methods.setValue(
          "amountTwo",
          (fromCoin.rate / toCoin.rate) *
            Number(methods.getValues("amount")) *
            (1 - Number(settings.convertation_fee) / 100),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCoinId]);

  useEffect(() => {
    if (coins && fromCoinId && toCoinId) {
      const fromCoin = coins.data.find((coin) => coin.id === fromCoinId);
      const toCoin = coins.data.find((coin) => coin.id === toCoinId);

      if (
        walletData &&
        fromCoin?.rate &&
        toCoin?.rate &&
        settings?.convertation_fee
      ) {
        methods.setValue(
          "amount",
          (toCoin.rate / fromCoin.rate) *
            Number(methods.getValues("amountTwo")) *
            (1 + Number(settings.convertation_fee) / 100),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toCoinId]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Title className="flex lg:hidden pb-6" title={t("conversions")} />
      </div>
      <Attention
        className="p-6"
        title={t("pay-attention")}
        content={<AttentionContent />}
      />
      <div className="box p-6 mt-16">
        <form onSubmit={methods.handleSubmit(formHandler)} noValidate>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 items-start">
            <TextField
              type="number"
              placeholder={t("enter the amount")}
              methods={methods}
              registerName="amount"
              options={{
                onChange: (e) => {
                  if (coins && fromCoinId && toCoinId) {
                    const fromCoin = coins.data.find(
                      (coin) => coin.id === fromCoinId,
                    );
                    const toCoin = coins.data.find(
                      (coin) => coin.id === toCoinId,
                    );

                    if (
                      walletData &&
                      fromCoin?.rate &&
                      toCoin?.rate &&
                      settings?.convertation_fee
                    ) {
                      methods.setValue(
                        "amountTwo",
                        (fromCoin.rate / toCoin.rate) *
                          Number(e.target.value) *
                          (1 - Number(settings.convertation_fee) / 100),
                      );
                    }
                  }
                },
              }}
              rightBlock={
                <TextFieldSelect
                  value={fromCoinId}
                  list={formatCoins}
                  onClickItem={(id) => {
                    if (id === toCoinId)
                      return toast.error(
                        t("You cannot convert identical coins"),
                      );

                    setFromCoinId(id);
                  }}
                />
              }
            />

            <div>
              <TextField
                type="number"
                placeholder={t("enter the amount")}
                methods={methods}
                registerName="amountTwo"
                options={{
                  onChange: (e) => {
                    if (coins && fromCoinId && toCoinId) {
                      const fromCoin = coins.data.find(
                        (coin) => coin.id === fromCoinId,
                      );
                      const toCoin = coins.data.find(
                        (coin) => coin.id === toCoinId,
                      );

                      if (
                        walletData &&
                        fromCoin?.rate &&
                        toCoin?.rate &&
                        settings?.convertation_fee
                      ) {
                        methods.setValue(
                          "amount",
                          (toCoin.rate / fromCoin.rate) *
                            Number(e.target.value) *
                            (1 + Number(settings.convertation_fee) / 100),
                        );
                      }
                    }
                  },
                }}
                rightBlock={
                  <TextFieldSelect
                    value={toCoinId}
                    list={formatCoins}
                    onClickItem={(id) => {
                      if (id === fromCoinId)
                        return toast.error(
                          t("You cannot convert identical coins"),
                        );

                      setToCoinId(id);
                    }}
                  />
                }
              />

              {settings?.convertation_fee && (
                <p className="mt-1 text-gray-1 text-xs">
                  {t("Commission")}: {settings.convertation_fee}%
                </p>
              )}
            </div>
          </div>

          <Button
            className="mt-8"
            title={!isLoading ? t("convert") : t("loading")}
            color="primary"
            type="submit"
            disabled={isLoading}
          />
        </form>
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
            "you can convert your assets with a minimum commission of 1%. For example, you need USDT for withdrawal, but you only have BNB. Select BNB and the amount in the window, then select USDT in a separate window. Convert in 2 clicks",
          )}
        </p>
      </div>
    </>
  );
};
