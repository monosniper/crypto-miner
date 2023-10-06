import { FC } from "react";
import styles from "./Header.module.css";
import { BurgerIcon, NotificationsIcon } from "@/components/icons";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { main, setOpenSidebar } from "@/redux/slices/main";

type Props = {
  title?: string;
};

export const Header: FC<Props> = ({ title = "Главная" }) => {
  const dispatch = useAppDispatch();
  const { isOpenSidebar } = useAppSelector(main);

  return (
    <header className="flex items-center justify-between gap-6 py-6 lg:py-[30px]">
      <h2 className="hidden lg:flex font-semibold text-2xl text-base-content-100 -tracking-[0.48px]">
        {title}
      </h2>
      <div
        className="lg:hidden"
        onClick={() => dispatch(setOpenSidebar(!isOpenSidebar))}
      >
        <BurgerIcon width={30} height={30} />
      </div>

      <div>
        <NotificationsIcon />
      </div>
    </header>
  );
};
