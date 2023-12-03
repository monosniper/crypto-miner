import { FC } from "react";
import { EmptyText } from "..";
import { useTranslation } from "react-i18next";
import { Session } from "@/types";

type Props = {
  type?: "mining" | "server";
  session?: Session | null;
  loading?: boolean;
};

export const LogsBlock: FC<Props> = ({ type = "mining", session, loading }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap -m-3">
      {type === "mining" && (
        <>
          <div className="w-full md:w-1/2 p-3">
            <div className="box w-full p-4 min-h-[150px] flex flex-col gap-1">
              {!loading && (
                <>
                  {!session || !session.servers ? (
                    <EmptyText
                      className="text-gray-1"
                      text={t("no data available")}
                    />
                  ) : (
                    <>
                      {session.servers.map((el, idx) => {
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
                  {!session || !session.coins ? (
                    <EmptyText
                      className="text-gray-1"
                      text={t("no data available")}
                    />
                  ) : (
                    <>
                      {session.coins.map((el, idx) => {
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
