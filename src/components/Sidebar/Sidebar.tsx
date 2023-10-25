import { useRef, FC, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { Menu, Socials } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  main,
  setLanguage,
  setOpenSidebar,
  setTheme,
} from "@/redux/slices/mainSlice";
import cn from "clsx";
import { useOutside } from "@/hooks";
import { Select, TelegramLink } from "@/components/ui";
import { languagesData, themesData } from "@/data";

type Props = {
  isLaptop: boolean;
};

export const Sidebar: FC<Props> = ({ isLaptop }) => {
  const { isOpenSidebar, language, theme } = useAppSelector(main);
  const ref = useRef(null);
  const dispatch = useAppDispatch();

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
          <Link
            className="bg-gradient-3 bg-clip-text text-transparent text-3xl font-semibold"
            to="/"
          >
            Hogyx
          </Link>
        </div>

        <div className="my-10 overflow-y-auto px-6">
          <Menu />
        </div>

        <div className="mt-auto">
          <div className="flex flex-col gap-4 px-6">
            <p className="text-xs text-base-content-300 uppercase">Контакты</p>

            <TelegramLink />
          </div>

          <div className="flex flex-col gap-4 px-6 mt-4">
            <p className="text-xs text-base-content-300">Наши соц.сети</p>

            <Socials />
          </div>

          <div className="flex items-center gap-2 lg:gap-4 flex-wrap py-4 border-t border-b border-base-border-100 px-6 mt-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-base-content-300">Язык</p>

              <Select
                list={languagesData}
                value={language}
                onChange={(value) =>
                  dispatch(setLanguage(value as "rus" | "eng"))
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xs text-base-content-300">Тема</p>

              <Select
                list={themesData}
                value={theme}
                onChange={(value) =>
                  dispatch(setTheme(value as "light" | "dark"))
                }
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 px-6">
            <p className="text-xs text-base-content-300">
              © app.hogyx.io, 2023
            </p>
            <Link className="text-xs text-base-content-300" to="/">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
