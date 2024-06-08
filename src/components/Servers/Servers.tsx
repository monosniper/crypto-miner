import { Preset, PropsWithClassName, ServerStatuses } from "@/types";
import { FC, RefObject } from "react";
import cn from "clsx";
import { Buy } from "../ui";
import { CoinSkelet, ServersItem } from "@/components";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/redux/store";
import { mining } from "@/redux/slices/miningSlice";
import { useMining } from "@/hooks/useMining";

type Props = {
  type?: "mining" | "standart";
  plansRef?: RefObject<HTMLDivElement>;
  servers?: (Preset & { status: ServerStatuses })[];
  loading?: boolean;
};

export const Servers: FC<PropsWithClassName<Props>> = ({
  className,
  plansRef,
  servers,
  loading,
  type = "standart",
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const { toggleServerSelection, sessionData } = useMining();
  const { selectedServers } = useAppSelector(mining);

  const buyServerHandler = () => {
    if (!location.pathname.includes("/server-packages")) {
      navigate("/server-packages");
    }

    if (!plansRef || !plansRef.current) return;

    plansRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={cn(className, "flex flex-wrap -m-2")}>
      {!location.pathname.includes("/server-packages") && (
        <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
          <Buy title={t("buy server")} onClick={buyServerHandler} />
        </div>
      )}

      {!loading ? (
        <>
          {servers && (
            <>
              {type === "mining"
                ? servers.map((el) => {
                    const foundSelectedServer = selectedServers.find(
                      (id) => id === el.id
                    );
                    const inWork =
                      Boolean(foundSelectedServer && sessionData) || false;

                    return (
                      <div
                        key={el.id}
                        className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                      >
                        <ServersItem
                          type={type}
                          onClick={() => {
                            if (!sessionData) {
                              toggleServerSelection(el.id);
                            }
                          }}
                          data={el}
                          selected={
                            selectedServers.find((id) => id === el.id)
                              ? true
                              : false
                          }
                          inWork={inWork}
                        />
                      </div>
                    );
                  })
                : servers.map((el) => {
                    return (
                      <div
                        key={el.id}
                        className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                      >
                        <ServersItem
                          type={type}
                          onClick={() => navigate(`/server/${el.id}`)}
                          data={el}
                        />
                      </div>
                    );
                  })}
            </>
          )}
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
