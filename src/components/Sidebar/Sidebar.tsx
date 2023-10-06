import { useRef, FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { Language, Menu } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { main, setOpenSidebar } from "@/redux/slices/main";
import { useOutside } from "@/hooks";
import cn from "clsx";

type Props = {
  isLaptop: boolean;
};

export const Sidebar: FC<Props> = ({ isLaptop }) => {
  const { isOpenSidebar } = useAppSelector(main);
  const ref = useRef(null);
  const dispatch = useAppDispatch();

  useOutside(ref, () => {
    if (!isLaptop) {
      dispatch(setOpenSidebar(false));
    }
  });

  return (
    <div className={cn({ [styles.wrapperBg]: !isLaptop && isOpenSidebar })}>
      <div
        className={cn(styles.sidebar, {
          [styles.isOpen]: isOpenSidebar,
        })}
        ref={ref}
      >
        <div className={styles.header}>
          <Link to="/">
            <img src="/images/logo.svg" alt="logo" />
          </Link>
        </div>

        <div className="my-10 overflow-y-auto">
          <Menu />
        </div>

        <div className="mt-auto">
          <Language />

          <div className="mt-6 flex flex-col gap-2">
            <p className="text-xs text-base-content-300">
              © crypto-miner.io, 2023
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
