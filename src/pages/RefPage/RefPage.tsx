import { Attention, Title } from "@/components";
import { CopyIcon } from "@/components/icons/CopyIcon";
import { FieldWrapper, TextField } from "@/components/ui";
import { useGetRefQuery } from "@/redux/api/userApi";
import { copyText } from "@/utils";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const RefPage = () => {
  const { t } = useTranslation();
  const { data: refData } = useGetRefQuery(null);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Title className="flex lg:hidden pb-6" title={t("referral system")} />
      </div>

      <Attention
        className="p-6"
        title={t("pay-attention")}
        content={<AttentionContent />}
      />

      <div className="box p-6 mt-16">
        <FieldWrapper title={t("your referral link")}>
          <TextField
            className="[&>input]:!text-gray-1"
            value={
              refData
                ? `https://www.hogyx.io?ref_code=${refData.data?.ref_code}`
                : ""
            }
            readOnly={true}
            rightBlock={
              <div
                className="cursor-pointer"
                onClick={() => {
                  if (!refData?.data) return;

                  copyText(
                    `https://www.hogyx.io?ref_code=${refData.data.ref_code}`
                  );

                  toast.success(t("the text has been copied"));
                }}
              >
                <CopyIcon className="[&>g>path]:stroke-base-content-100" />
              </div>
            }
          />
        </FieldWrapper>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
        <div className="box p-4 lg:p-6">
          <h4 className="font-medium text-base">{t("number of referrals")}:</h4>

          <p className="text-3xl font-bold mt-4">
            {refData?.data?.total_refs || 0}
          </p>
        </div>
        <div className="box p-4 lg:p-6">
          <h4 className="font-medium text-base">
            {t("the number of deposits")}:
          </h4>

          <p className="text-3xl font-bold mt-4">
            {" "}
            {refData?.data?.total_refs_amount || 0}
          </p>
        </div>
        <div className="box p-4 lg:p-6">
          <h4 className="font-medium text-base">
            {t("the percentage received")}:
          </h4>

          <p className="text-3xl font-bold mt-4">
            {refData?.data ? refData.data.total_refs_amount / 10 : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

const AttentionContent = () => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <p>{t("invite your friends and get 10% of all their deposits")}</p>
      </div>
    </>
  );
};
