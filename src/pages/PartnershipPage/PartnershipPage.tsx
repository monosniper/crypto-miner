import { Map, Title } from "@/components";
import styles from "./PartnershipPage.module.css";
import { Button, FieldWrapper, TextField } from "@/components/ui";
import { useTranslation } from "react-i18next";
import { usePartnershipMutation } from "@/redux/api/userApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export const PartnershipPage = () => {
  const { t } = useTranslation();
  const methods = useForm<{ amount: number }>();
  const [partnership, { data, error, isLoading }] = usePartnershipMutation();

  useEffect(() => {
    if (!data) return;

    if (!data.url || data.success === false) {
      toast.error(t("mistake"));
    }

    if (data.url) {
      window.open(data.url, "_blank");
    }
  }, [data, t]);

  useEffect(() => {
    if (!error) return;

    toast.error(t("mistake"));
  }, [data?.success, error, t]);

  const formHandler = (data: { amount: number }) => {
    if (!data.amount) return;

    partnership({ amount: data.amount });
  };

  return (
    <div>
      <Title className="flex lg:hidden pb-6" title="Партнёрство" />

      <div>
        <Map />

        <div className="mt-8 bg-base-200 border border-base-border-100 rounded-xl p-6">
          <div className="flex flex-wrap -m-5">
            <div className="w-full lg:w-1/2 p-5">
              <div className="flex flex-col gap-6">
                <h5 className="text-xl font-semibold">Why do we use it?</h5>

                <p className="text-base">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-1/2 p-5">
              <div className="flex flex-col gap-6">
                <h5 className="text-xl font-semibold">Why do we use it?</h5>

                <p className="text-base">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Title title={t("invest")} />

          <div className={styles.invest}>
            <Title
              className="text-lg text-white !font-medium"
              title={t("enter the amount")}
              tag="h5"
            />

            <form
              className="flex flex-col sm:flex-row items-end gap-8"
              onSubmit={methods.handleSubmit(formHandler)}
            >
              <FieldWrapper
                className="mt-8 w-full [&>p]:first:!text-white"
                title={`${t("amount")}, USDT`}
              >
                <TextField
                  className="h-12 bg-black/40 border border-[#444E54] [&>input]:!text-white"
                  methods={methods}
                  registerName="amount"
                  options={{
                    required: true,
                    valueAsNumber: true,
                  }}
                />
              </FieldWrapper>

              <Button
                className={styles.investBtn}
                color="standart"
                disabled={isLoading}
                title={isLoading ? t("loading") : t("enter invest")}
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
