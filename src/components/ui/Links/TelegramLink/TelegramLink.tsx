import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetSettingsQuery } from "@/redux/api/mainApi";

export const TelegramLink = () => {
  const { t } = useTranslation();
  const { data: settings } = useGetSettingsQuery(null);

  return (
    <Link
      className="flex items-center gap-1 py-1 px-2 rounded-md border border-base-border-100 w-max text-base-content-100"
      to={settings?.telegram || "/"}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z"
          fill="url(#paint0_linear_410_14567)"
        />
        <path
          d="M2.49715 5.94795L6.53762 4.28321C6.93646 4.1098 8.28906 3.55489 8.28906 3.55489C8.28906 3.55489 8.91334 3.31211 8.86132 3.90171C8.84397 4.14448 8.70525 4.99419 8.56652 5.91327L8.13299 8.63581C8.13299 8.63581 8.09831 9.03466 7.80351 9.10402C7.50871 9.17338 7.02317 8.86124 6.93646 8.79188C6.8671 8.73986 5.63588 7.95951 5.18501 7.57801C5.06363 7.47396 4.9249 7.26587 5.20236 7.02309C5.82663 6.45084 6.5723 5.73986 7.02317 5.28899C7.23126 5.0809 7.43935 4.59535 6.5723 5.18494L4.12721 6.83234C4.12721 6.83234 3.84975 7.00575 3.32952 6.84968C2.80929 6.69361 2.20236 6.48552 2.20236 6.48552C2.20236 6.48552 1.78617 6.22541 2.49715 5.94795Z"
          fill="white"
        />
        <defs>
          <linearGradient
            id="paint0_linear_410_14567"
            x1="8.00046"
            y1="2.00046"
            x2="5.00046"
            y2="9"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#37AEE2" />
            <stop offset="1" stopColor="#1E96C8" />
          </linearGradient>
        </defs>
      </svg>

      <span>{t("support")} 24/7</span>
    </Link>
  );
};
