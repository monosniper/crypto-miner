import { Logs as LogsType } from "@/types";
import { FC } from "react";
import { EmptyText } from "..";
import { useTranslation } from "react-i18next";

type Props = {
  logs?: LogsType | null;
  loading?: boolean;
};

export const LogsBlock: FC<Props> = ({ logs, loading }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap -m-3">
      <div className="w-full md:w-1/2 p-3">
        <div className="box w-full p-4 min-h-[150px] flex flex-col gap-1">
          {!loading && (
            <>
              {!logs || !logs.server ? (
                <EmptyText
                  className="text-gray-1"
                  text={t("no data available")}
                />
              ) : (
                <>
                  {logs.server.map((el, idx) => {
                    return <p key={idx}>{el.text}</p>;
                  })}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="w-full md:w-1/2 p-3">
        <div className="box w-full p-4 min-h-[150px] flex flex-col gap-1">
          {!loading && (
            <>
              {!logs || !logs.miner ? (
                <EmptyText
                  className="text-gray-1"
                  text={t("no data available")}
                />
              ) : (
                <>
                  {logs.miner.map((el, idx) => {
                    return <p key={idx}>{el.text}</p>;
                  })}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
