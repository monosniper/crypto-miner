import styles from "./Header.module.css";
import { BurgerIcon, NotificationsIcon, PrevIcon } from "@/components/icons";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { main, setOpenSidebar } from "@/redux/slices/mainSlice";
import { Title } from "@/components";
import { useLocation, useNavigate } from "react-router-dom";
import { pagesTitles } from "@/data";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { isOpenSidebar } = useAppSelector(main);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      {!location.pathname.includes("/server/") ? (
        <Title
          className="hidden lg:flex"
          title={t(pagesTitles[location.pathname] as string)}
        />
      ) : (
        <button
          className="items-center gap-4 font-semibold text-2xl hidden lg:flex"
          onClick={() => {
            navigate(-1);
          }}
        >
          <PrevIcon className="prev-icon" />
          <span>Сервер</span>
        </button>
      )}

      <div
        className={styles.burgerWrapper}
        onClick={() => dispatch(setOpenSidebar(!isOpenSidebar))}
      >
        <BurgerIcon width={30} height={30} />
      </div>

      <div className="cursor-pointer">
        <NotificationsIcon />
      </div>
    </header>
  );
};
