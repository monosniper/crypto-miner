import { Title } from "@/components";
import { CopyIcon } from "@/components/icons/CopyIcon";
import { FieldWrapper, TextField } from "@/components/ui";
import { user } from "@/redux/slices/userSlice";
import { useAppSelector } from "@/redux/store";
import { copyText } from "@/utils";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const RefPage = () => {
  const { t } = useTranslation();
  const { userData } = useAppSelector(user);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Title className="flex lg:hidden pb-6" title={t("referral system")} />
      </div>

      <div className="bg-base-200 border border-base-border-100 rounded-xl p-6">
        <div className="flex flex-wrap -m-5">
          <div className="w-full2 p-5">
            <div className="flex flex-col gap-6">
              <p className="text-base">
                Пригласите друзей и получайте 10% от всех их пополнений.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="box p-6 mt-8">
        <FieldWrapper title={t("your referral link")}>
          <TextField
            className="[&>input]:!text-gray-1"
            value={
              userData
                ? `https://www.hogyx.io?ref_code=${userData.ref_code}`
                : ""
            }
            readOnly={true}
            rightBlock={
              <div
                className="cursor-pointer"
                onClick={() => {
                  if (!userData) return;

                  copyText(
                    `https://www.hogyx.io?ref_code=${userData.ref_code}`,
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
        <div className="box p-6 w-full sm:flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <b>{t("number of referrals")}:</b>

              <span>{userData?.total_refs || 0}</span>
            </div>
          </div>
        </div>
        <div className="box p-6 w-full sm:flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <b>{t("the number of deposits")}:</b>

              <span>{userData?.total_refs_amount || 0}</span>
            </div>

            <div className="flex justify-between items-center">
              <b>{t("the percentage received")}:</b>

              <span>{userData ? userData.total_refs_amount / 10 : 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
