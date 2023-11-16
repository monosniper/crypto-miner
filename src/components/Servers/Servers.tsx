import { PropsWithClassName } from "@/types";
import { FC, RefObject } from "react";
import cn from "clsx";
import { Buy } from "../ui";
import { CoinSkelet, ServersItem } from "@/components";
import { useNavigate } from "react-router-dom";
import { Server } from "@/types";
import { useTranslation } from "react-i18next";

type Props = {
  plansRef?: RefObject<HTMLDivElement>;
  servers?: Server[];
  loading?: boolean;
};

export const Servers: FC<PropsWithClassName<Props>> = ({
  className,
  plansRef,
  servers,
  loading,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const buyServerHandler = () => {
    if (!plansRef || !plansRef.current) return;

    plansRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={cn(className, "flex flex-wrap -m-2")}>
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
        <Buy title={t("buy server")} onClick={buyServerHandler} />
      </div>

      {!loading ? (
        <>
          {servers &&
            servers.map((el) => {
              return (
                <div
                  key={el.id}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                >
                  <ServersItem
                    type="button"
                    onClick={() => navigate(`/server/${el.id}`)}
                    data={el}
                  />
                </div>
              );
            })}
        </>
      ) : (
        <>
          <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
            <CoinSkelet />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
            <CoinSkelet />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
            <CoinSkelet />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
            <CoinSkelet />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
            <CoinSkelet />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2 lg:hidden xl:block">
            <CoinSkelet />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2 lg:hidden xl:block">
            <CoinSkelet />
          </div>
        </>
      )}
    </div>
  );
};
