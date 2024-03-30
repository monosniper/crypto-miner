import { useTranslation } from "react-i18next";
import styles from "./HelpBtn.module.css";
import { useEffect, useState } from "react";
import { HelpChat } from "@/components/HelpChat/HelpChat";

export const HelpBtn = () => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <div className="fixed bottom-5 right-3 lg:bottom-9 lg:right-10">
      <div className="relative">
        {isOpen && <HelpChat setOpen={setOpen} />}

        <button
          className={styles.btn}
          data-before-title={t("need-help")}
          onClick={toggleOpen}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M21 10C21 13.8624 18.2967 17.1565 14.5 18.4334C13.4107 18.7997 12.2313 19 11 19C7 19 2 21 2 21L3.1323 18.5543C3.6952 17.3384 3.336 15.9248 2.5616 14.8314C1.5729 13.4356 1 11.778 1 10C1 5.0294 5.4772 1 11 1C16.5228 1 21 5.0294 21 10Z"
              fill="#7C55E7"
              stroke="#7C55E7"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
