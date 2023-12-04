import { FC } from "react";
import { EmptyText } from "..";
import { useTranslation } from "react-i18next";
import { ServerLog } from "@/types";

type Props = {
  type?: "mining" | "server";
  loading?: boolean;
  left?: ServerLog[];
};

export const LogsBlock: FC<Props> = ({ type = "mining", loading, left }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap -m-3">
      {type === "mining" && (
        <>
          <div className="w-full md:w-1/2 p-3">
            <div className="box w-full p-4 h-[150px] overflow-hidden">
              <div className="overflow-y-auto h-[calc(150px-32px)]  scrollbar-none flex flex-col gap-1">
                {!loading && (
                  <>
                    {!left || left.length === 0 ? (
                      <EmptyText
                        className="text-gray-1"
                        text={t("no data available")}
                      />
                    ) : (
                      <>
                        {left.map((el, idx) => {
                          return (
                            <p key={idx}>
                              <span className="text-yellow-500">
                                [{el.coin}]
                              </span>{" "}
                              {el.text}{" "}
                              <span className="text-purple-2">
                                {el.contrast}
                              </span>
                            </p>
                          );
                        })}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-3">
            <div className="box w-full p-4 h-[150px] overflow-hidden">
              <div className="overflow-y-auto h-[calc(150px-32px)]  scrollbar-none flex flex-col gap-1">
                {!loading && (
                  <>
                    {!left || left.length === 0 ? (
                      <EmptyText
                        className="text-gray-1"
                        text={t("no data available")}
                      />
                    ) : (
                      <>
                        {left.map((el, idx) => {
                          return (
                            <p key={idx}>
                              <span className="text-yellow-500">
                                [{el.coin}]
                              </span>{" "}
                              {el.text}{" "}
                              <span className="text-purple-2">
                                {el.contrast}
                              </span>
                            </p>
                          );
                        })}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
