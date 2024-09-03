import { EmptyText, Graph, LogsBlock, Title } from "@/components";
import { FanIcon, PrevIcon } from "@/components/icons";
import { useNavigate, useParams } from "react-router-dom";
import cn from "clsx";
import { useTranslation } from "react-i18next";
import { Found, Log, ServerLog, ServerStatuses } from "@/types";
import { getServerStatus } from "@/data";
import { useGetMyServerByIdQuery } from "@/redux/api/serversApi";
import styles from "./ServerPage.module.css";
import { useEffect, useState } from "react";
import { getPastTimeStr } from "@/utils";
import moment from "moment";

// const currentDate = moment.utc();

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const ServerPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: serverData, isLoading } = useGetMyServerByIdQuery(
    { id: Number(id) },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    }
  );
  const [cpuList, setCpuList] = useState<number[]>([getRandomNumber(95, 100)]);
  const [gpuList, setGpuList] = useState<number[]>([getRandomNumber(95, 100)]);
  const [ramList, setRamList] = useState<number[]>([]);
  const [tempCpuList, setTempCpuList] = useState<number[]>([
    getRandomNumber(55, 65),
  ]);
  const [tempGpuList, setTempGpuList] = useState<number[]>([
    getRandomNumber(65, 70),
  ]);

  useEffect(() => {
    setRamList(
      new Array(1)
        .fill(0)
        .map(() =>
          getRandomNumber(
            Number(serverData?.data.configuration.ram.match(/\d+/)) - 1,
            Number(serverData?.data.configuration.ram.match(/\d+/))
          )
        )
    );
  }, [serverData?.data.configuration.ram]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuList((prev) => {
        const newValue = getRandomNumber(95, 100);
        if (prev.length < 8) {
          return [...prev, newValue];
        } else {
          return [];
        }
      });

      setGpuList((prev) => {
        const newValue = getRandomNumber(95, 100);
        if (prev.length < 8) {
          return [...prev, newValue];
        } else {
          return [];
        }
      });

      setRamList((prev) => {
        const newValue = getRandomNumber(
          Number(serverData?.data.configuration.ram.match(/\d+/)) - 1,
          Number(serverData?.data.configuration.ram.match(/\d+/))
        );
        if (prev.length < 8) {
          return [...prev, newValue];
        } else {
          return [];
        }
      });

      setTempCpuList((prev) => {
        const newValue = getRandomNumber(55, 65);
        if (prev.length < 8) {
          return [...prev, newValue];
        } else {
          return [];
        }
      });

      setTempGpuList((prev) => {
        const newValue = getRandomNumber(65, 70);
        if (prev.length < 8) {
          return [...prev, newValue];
        } else {
          return [];
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const renderLogs = (logs: (ServerLog | Found | Log)[]) => (
    <>
      {logs.length === 0 ? (
        <EmptyText className="text-gray-1" text={t("no data available")} />
      ) : (
        logs.map((el, idx) => (
          <p key={idx} className="whitespace-nowrap text-sm">
            <span className="text-yellow-500">
              {/* [{(el as ServerLog).coin || (el as Found).id}] */}

              {`[${moment.utc(el.timestamp).local().format("DD.MM.YYYY")}]`}
            </span>{" "}
            {(el as ServerLog).text || `Found: ${(el as Found).amount || 0}`}{" "}
            <span className="text-purple-2">
              {(el as ServerLog).contrast || (el as Log).contrast}
            </span>
          </p>
        ))
      )}
    </>
  );

  return (
    <div>
      <button
        className="flex items-center gap-4 lg:hidden font-semibold text-2xl mb-6"
        onClick={() => {
          navigate(-1);
        }}
      >
        <PrevIcon className="prev-icon" />
        <span>{t("server")}</span>
      </button>

      {!isLoading && serverData?.data?.title ? (
        <Title title={serverData.data.title} />
      ) : (
        <div className="w-20 h-2 rounded bg-base-200 animate-pulse"></div>
      )}

      <div className={cn("box", "p-6 mt-6")}>
        <div className="flex justify-between items-start flex-wrap gap-4 flex-col-reverse min-[500px]:items-center min-[500px]:flex-row">
          <h5>{t("status")}</h5>
        </div>

        <div className="flex justify-between items-center gap-3 gap-y-6 flex-wrap mt-4">
          <div className="flex items-center gap-4 w-full justify-between flex-wrap">
            <div className="flex items-center gap-4 flex-wrap w-full sm:w-auto">
              <div
                className={cn(styles.state, {
                  [styles.notActive]:
                    serverData?.data.status ===
                    ServerStatuses.NOT_ACTIVE_STATUS,
                })}
              >
                <FanIcon
                  className={cn({
                    "animate-spin":
                      serverData?.data.status === ServerStatuses.WORK_STATUS,
                  })}
                  width={32}
                  height={32}
                />
              </div>

              <p className="text-2xl font-semibold">
                {t(getServerStatus(serverData?.data.status as ServerStatuses))}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-end w-full">
            <div className="flex flex-col gap-1 text-base font-medium text-base-content-300">
              <p>{serverData?.data.configuration.cpu}</p>
              <p>{serverData?.data.configuration.gpu}</p>
              <p>{serverData?.data.configuration.disk}</p>
            </div>

            {/* <div className="flex items-center gap-5 flex-wrap">
              <Button title={t("Change the coin")} />
              <Button title={t("Shutdown request")} />
            </div> */}
          </div>
        </div>
      </div>

      {serverData?.data?.logs?.[0]?.timestamp && (
        <div className="py-4">
          {t("Server in work")}:{" "}
          <span className="font-semibold">
            {getPastTimeStr(serverData.data.logs[0].timestamp, t)}
          </span>
        </div>
      )}

      <div
        className={cn("flex flex-col gap-4 lg:gap-6", {
          "mt-6": !serverData?.data?.logs?.[0]?.timestamp,
        })}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
          <div className="flex flex-col gap-4 lg:gap-6">
            <LogsBlock
              className="h-max"
              children={
                <div className="relative -ml-4 lg:-ml-6 w-[calc(100%+32px)] lg:w-[calc(100%+48px)]">
                  <Graph
                    graphData={cpuList}
                    y={{
                      ticks: 6,
                      min: 20,
                      max: 100,
                      afterNumber: "%",
                    }}
                    margins={{
                      left: 40,
                      right: 0,
                      bottom: 20,
                    }}
                  />
                </div>
              }
              title="CPU Usage"
            />

            <div className={cn("w-full")}>
              <div className="box w-full p-4 h-[375px] overflow-hidden">
                <div className="overflow-y-auto h-[calc(375px-32px)] scrollbar-none flex flex-col gap-1">
                  {renderLogs(serverData.data.logs)}
                </div>
              </div>
            </div>
          </div>
          <LogsBlock
            className="h-max"
            children={
              <div className="relative -ml-4 lg:-ml-6 w-[calc(100%+32px)] lg:w-[calc(100%+48px)]">
                <Graph
                  graphData={gpuList}
                  y={{
                    ticks: 6,
                    min: 20,
                    max: 100,
                    afterNumber: "%",
                  }}
                  margins={{
                    left: 40,
                    right: 0,
                    bottom: 20,
                  }}
                />
              </div>
            }
            title="GPU Usage"
          />
          <LogsBlock
            className="h-max"
            children={
              <div className="relative -ml-4 lg:-ml-6 w-[calc(100%+32px)] lg:w-[calc(100%+48px)]">
                <Graph
                  graphData={ramList}
                  y={{
                    ticks: 6,
                    min: 1,
                    max: Number(
                      serverData?.data.configuration.ram.match(/\d+/)
                    ),
                  }}
                  margins={{
                    left: 25,
                    right: 0,
                    bottom: 20,
                  }}
                />
              </div>
            }
            title="RAM Usage"
          />
          <LogsBlock
            className="h-auto"
            children={
              <div className="flex flex-col gap-2">
                <div className="relative -ml-4 lg:-ml-6 w-[calc(100%+32px)] lg:w-[calc(100%+48px)] mt-4">
                  <p className="ml-3">CPU</p>

                  <Graph
                    graphData={tempCpuList}
                    y={{
                      min: 30,
                      max: 70,
                    }}
                    margins={{
                      left: 25,
                      right: 0,
                      bottom: 20,
                    }}
                  />
                </div>
                <div className="relative -ml-4 lg:-ml-6 w-[calc(100%+32px)] lg:w-[calc(100%+48px)] mt-4">
                  <p className="ml-3">GPU</p>

                  <Graph
                    graphData={tempGpuList}
                    y={{
                      min: 40,
                      max: 80,
                    }}
                    margins={{
                      left: 25,
                      right: 0,
                      bottom: 20,
                    }}
                  />
                </div>
              </div>
            }
            title="Temperathure"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"></div>
      </div>
    </div>
  );
};
