import styles from "./Header.module.css";
import { BurgerIcon, NotificationsIcon } from "@/components/icons";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { main, setOpenSidebar } from "@/redux/slices/mainSlice";
import { Title } from "@/components";
import { useLocation } from "react-router-dom";
import { pagesTitles } from "@/data";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { isOpenSidebar } = useAppSelector(main);
  const location = useLocation();

  return (
    <header className={styles.header}>
      <Title
        className="hidden lg:flex"
        title={pagesTitles[location.pathname]}
      />
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
