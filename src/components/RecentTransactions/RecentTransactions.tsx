import { useGetCoinsQuery } from "@/redux/api/coinsApi";
import Marquee from "react-fast-marquee";
import cn from "clsx";
import { ArrTopIcon } from "../icons";
import styles from "./RecentTransactions.module.css";

export const RecentTransactions = () => {
  const { data: coins } = useGetCoinsQuery(null);

  return (
    <Marquee className="w-screen py-1 px-2 border-b border-base-border-100 !sticky !top-0 bg-base-100 z-20">
      {coins?.data &&
        coins.data.map((el) => {
          return (
            <div className="flex items-center gap-2 px-4" key={el.id}>
              <img src={el.icon_url} alt="" width={16} height={16} />

              <p className="text-sm font-inter">
                {el.name}, {el.slug}
              </p>

              <div className="text-sm font-inter">
                {"change" in el && (
                  <div
                    className={cn(styles.changeCourse, {
                      [styles.decline]:
                        "change" in el && el.change < 0 ? true : false,
                    })}
                  >
                    <span
                      className={cn({
                        "!text-base-content-100": el.change === 0,
                      })}
                    >
                      {el.change ? el.change.toFixed(2) : 0}%
                    </span>
                    {el.change !== 0 && <ArrTopIcon />}
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </Marquee>
  );
};
