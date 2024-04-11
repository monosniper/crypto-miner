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

      <div className="flex items-start mt-8 flex-wrap gap-4">
        {/* <img
          className="w-full sm:max-w-[300px]"
          src="/images/podarok.png"
          alt="podarok"
        /> */}

        <div className="box p-6 w-full sm:flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <b>{t("number of referrals")}:</b>

              <span>{refData?.data?.total_refs || 0}</span>
            </div>

            <div className="flex justify-between items-center">
              <b>{t("the number of deposits")}:</b>

              <span>{refData?.data?.total_refs_amount || 0}</span>
            </div>
          </div>
        </div>
        <div className="box p-6 w-full sm:flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <b>{t("the percentage received")}:</b>

              <span>
                {refData?.data ? refData.data.total_refs_amount / 10 : 0}
              </span>
            </div>
          </div>
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
