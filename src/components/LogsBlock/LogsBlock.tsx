import { FC } from "react";
import { EmptyText } from "..";
import { useTranslation } from "react-i18next";
import { useMining } from "@/hooks/useMining";

type Props = {
  type?: "mining" | "server";
  loading?: boolean;
};

export const LogsBlock: FC<Props> = ({ type = "mining", loading }) => {
  const { t } = useTranslation();
  const { serversAllLogs } = useMining();

  return (
    <div className="flex flex-wrap -m-3">
      {type === "mining" && (
        <>
          <div className="w-full md:w-1/2 p-3">
            <div className="box w-full p-4 h-[150px] overflow-y-auto flex flex-col gap-1 scrollbar-none">
              {!loading && (
                <>
                  {serversAllLogs.length === 0 ? (
                    <EmptyText
                      className="text-gray-1"
                      text={t("no data available")}
                    />
                  ) : (
                    <>
                      {serversAllLogs.map((el, idx) => {
                        return (
                          <p key={idx}>
                            <span className="text-yellow-500">{el.coin}</span>{" "}
                            {el.text}{" "}
                            <span className="text-purple-2">{el.contrast}</span>
                          </p>
                        );
                      })}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 p-3">
            <div className="box w-full p-4 h-[150px] overflow-y-auto flex flex-col gap-1 scrollbar-none">
              {!loading && (
                <>
                  {serversAllLogs.length === 0 ? (
                    <EmptyText
                      className="text-gray-1"
                      text={t("no data available")}
                    />
                  ) : (
                    <>
                      {serversAllLogs.map((el, idx) => {
                        return <p key={idx}></p>;
                      })}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
