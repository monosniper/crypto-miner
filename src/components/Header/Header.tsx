import { FC } from "react";
import styles from "./Header.module.css";
import { BurgerIcon, NotificationsIcon } from "@/components/icons";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { main, setOpenSidebar } from "@/redux/slices/main";
import { Title } from "@/components";

type Props = {
  title?: string;
};

export const Header: FC<Props> = ({ title = "Главная" }) => {
  const dispatch = useAppDispatch();
  const { isOpenSidebar } = useAppSelector(main);

  return (
    <header className={styles.header}>
      <Title className="hidden lg:flex" title={title} />
      <div
        className="lg:hidden cursor-pointer"
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
