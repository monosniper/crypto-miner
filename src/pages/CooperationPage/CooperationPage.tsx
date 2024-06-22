import { Title } from "@/components";
import { useTranslation } from "react-i18next";
import cn from "clsx";
import { FieldWrapper, TextField } from "@/components/ui";
import { copyText } from "@/utils";
import { toast } from "react-toastify";
import { CopyIcon } from "@/components/icons/CopyIcon";

export const CooperationPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Title className="flex lg:hidden pb-6" title={t("Cooperation")} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={cn("box", "p-4 lg:p-6")}>
          <h3 className="text-lg font-medium">
            {t("Contact us and suggestions")}:
          </h3>

          <FieldWrapper className="mt-4 lg:mt-6" title={t("email")}>
            <TextField
              className="[&>input]:!text-gray-1"
              value={"test@mail.ru"}
              readOnly={true}
              rightBlock={
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    copyText(`test@mail.ru`);

                    toast.success(t("the text has been copied"));
                  }}
                >
                  <CopyIcon className="[&>g>path]:stroke-base-content-100" />
                </div>
              }
            />
          </FieldWrapper>
        </div>
        <div className={cn("box", "p-4 lg:p-6")}>
          <h3 className="text-lg font-medium">{t("To work with us")}:</h3>

          <FieldWrapper className="mt-4 lg:mt-6" title={t("email")}>
            <TextField
              className="[&>input]:!text-gray-1"
              value={"test@mail.ru"}
              readOnly={true}
              rightBlock={
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    copyText(`test@mail.ru`);

                    toast.success(t("the text has been copied"));
                  }}
                >
                  <CopyIcon className="[&>g>path]:stroke-base-content-100" />
                </div>
              }
            />
          </FieldWrapper>
        </div>
      </div>
    </div>
  );
};
