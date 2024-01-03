import { PropsWithClassName, ServerStatuses } from "@/types";
import { FC, RefObject } from "react";
import cn from "clsx";
import { Buy } from "../ui";
import { CoinSkelet, ServersItem } from "@/components";
import { useLocation, useNavigate } from "react-router-dom";
import { Server } from "@/types";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/redux/store";
import { mining } from "@/redux/slices/miningSlice";
import { useMining } from "@/hooks/useMining";
import { user } from "@/redux/slices/userSlice";

type Props = {
  type?: "mining" | "standart";
  plansRef?: RefObject<HTMLDivElement>;
  servers?: Server[];
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
  const { toggleServerSelection, checkIdentityType, sessionData } = useMining();
  const { selectedServers } = useAppSelector(mining);
  const { userData } = useAppSelector(user);

  const buyServerHandler = () => {
    if (!location.pathname.includes("/working-servers")) {
      navigate("/working-servers");
    }

    if (!plansRef || !plansRef.current) return;

    plansRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={cn(className, "flex flex-wrap -m-2")}>
      {!location.pathname.includes("/working-servers") && (
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
                      (item) => item.id === el.id,
                    );
                    const inWork =
                      Boolean(
                        foundSelectedServer &&
                          (userData?.session || sessionData),
                      ) || false;

                    return (
                      <div
                        key={el.id}
                        className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                      >
                        <ServersItem
                          type={type}
                          onClick={() => {
                            if (
                              el.status === ServerStatuses.ACTIVE_STATUS &&
                              !userData?.session &&
                              !sessionData
                            ) {
                              toggleServerSelection(el);
                            }
                          }}
                          data={el}
                          selected={
                            selectedServers.find(
                              (server) => el.id === server.id,
                            )
                              ? true
                              : false
                          }
                          disabled={
                            !checkIdentityType(el) ||
                            el.status !== ServerStatuses.ACTIVE_STATUS
                          }
                          inWork={inWork}
                          tooltip={{
                            value: el.last_work_at
                              ? Date.now() -
                                  new Date(el.last_work_at).getTime() <
                                24 * 60 * 60 * 1000
                                ? true
                                : false
                              : false,
                            title: t(
                              "the server was launched less than 24 hours ago",
                            ),
                          }}
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
