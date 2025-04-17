import { useRef, FC, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { Logo, Menu, Socials } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  main,
  setLanguage,
  setOpenSidebar,
  setTheme,
} from "@/redux/slices/mainSlice";
import cn from "clsx";
import { useOutside } from "@/hooks";
import { Select } from "@/components/ui";
import { languagesData } from "@/data";
import { useTranslation } from "react-i18next";
import { useGetSettingsQuery } from "@/redux/api/mainApi";

type Props = {
  isLaptop: boolean;
};

export const Sidebar: FC<Props> = ({ isLaptop }) => {
  const { isOpenSidebar, language, theme } = useAppSelector(main);
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const { i18n, t } = useTranslation();
  const { data: settings } = useGetSettingsQuery(null);

  useOutside(ref, () => dispatch(setOpenSidebar(false)));

  useEffect(() => {
    if (isOpenSidebar && !isLaptop) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isLaptop, isOpenSidebar]);

  return (
    <div className={cn({ [styles.wrapperBg]: !isLaptop && isOpenSidebar })}>
      <div
        className={cn(styles.sidebar, {
          [styles.isOpen]: isOpenSidebar,
        })}
        ref={ref}
      >
        <div className={styles.header}>
          {/* <Link
            className="bg-gradient-3 bg-clip-text text-transparent text-[34px] leading-10 font-semibold font-droid flex items-center gap-2"
            to="/"
          >
            <LogoIcon />
            Hogyx
          </Link> */}

          <Logo />
        </div>

        <div className="my-10 overflow-y-auto min-h-[50px] px-6 scrollbar-menu">
          <Menu />
        </div>

        <div className="mt-auto">
          {/* <div className="flex flex-col gap-4 px-6">
            <p className="text-xs text-base-content-300 uppercase">
              {t("contacts")}
            </p>

            <TelegramLink />
          </div> */}

          {settings?.offers_mail && (
            <div className="flex flex-col gap-4 px-6 mt-4">
              <p className="text-xs text-base-content-300">
                {t("Contact us and suggestions")}
              </p>

              <a
                className="text-base-content-100"
                href={`mailto:${settings.offers_mail}`}
              >
                {settings.offers_mail}
              </a>
            </div>
          )}

          {settings?.work_mail && (
            <div className="flex flex-col gap-4 px-6 mt-4">
              <p className="text-xs text-base-content-300">
                {t("To work with us")}
              </p>

              <a
                className="text-base-content-100"
                href={`mailto:${settings.work_mail}`}
              >
                {settings.work_mail}
              </a>
            </div>
          )}

          <div className="flex flex-col gap-4 px-6 mt-4">
            <p className="text-xs text-base-content-300">{t("our-socials")}</p>

            <Socials />
          </div>

          <div className="flex items-center gap-2 lg:gap-4 flex-wrap py-4 border-t border-b border-base-border-100 px-6 mt-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-base-content-300">{t("language")}</p>

              <Select
                list={languagesData}
                value={language}
                onChange={(value) => {
                  dispatch(setLanguage(value as "rus" | "eng"));
                  i18n.changeLanguage(value);
                }}
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xs text-base-content-300">{t("theme")}</p>

              <Select
                list={[
                  {
                    value: "light",
                    title: t("light"),
                    icon: "/images/themes/light.png",
                  },

                  {
                    value: "dark",
                    title: t("dark"),
                    icon: "/images/themes/dark.png",
                  },
                ]}
                value={theme}
                onChange={(value) =>
                  dispatch(setTheme(value as "light" | "dark"))
                }
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 px-6">
            <p className="text-xs text-base-content-300">
              © app.whales-mining.space, { new Date().getFullYear() }
            </p>
            <Link
              className="text-xs text-base-content-300"
              to="/privacy-policy"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
