import { ReactNode, FC, useEffect, useState } from "react";
import { Header, RecentTransactions, Sidebar } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setOpenSidebar } from "@/redux/slices/mainSlice";
import { user } from "@/redux/slices/userSlice";

type Props = {
  children: ReactNode;
};

export const PageLayout: FC<Props> = ({ children }) => {
  const [isLaptop, setLaptop] = useState(() => {
    return window.innerWidth >= 1024 ? true : false;
  });
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(user);

  useEffect(() => {
    const resizeListener = () => {
      if (window.innerWidth >= 1024) setLaptop(true);
      else setLaptop(false);
    };

    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  useEffect(() => {
    if (isLaptop) return;

    if (!isLaptop) {
      dispatch(setOpenSidebar(false));
    }
  }, [dispatch, isLaptop]);

  return (
    <>
      {isAuth ? (
        <div>
          <RecentTransactions />
          <Sidebar isLaptop={isLaptop} />
          <div className="flex flex-col px-6 lg:pl-[288px] lg:pr-20 pb-10">
            <Header />
            <main className="flex flex-col">{children}</main>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
