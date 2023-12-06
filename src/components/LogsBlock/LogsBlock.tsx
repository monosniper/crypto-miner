import { FC, useRef, useEffect } from "react";
import { EmptyText } from "..";
import { useTranslation } from "react-i18next";
import { Found, ServerLog } from "@/types";

type Props = {
  loading?: boolean;
  left?: ServerLog[];
  right?: Found[];
};

export const LogsBlock: FC<Props> = ({ loading, left, right }) => {
  const { t } = useTranslation();
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leftRef.current) return;

    leftRef.current.scrollTo(0, leftRef.current.scrollHeight);
  }, [left]);

  useEffect(() => {
    if (!rightRef.current) return;

    rightRef.current.scrollTo(0, rightRef.current.scrollHeight);
  }, [right]);

  return (
    <div className="flex flex-wrap -m-3">
      <div className="w-full md:w-1/2 p-3">
        <div className="box w-full p-4 h-[150px] overflow-hidden">
          <div
            className="overflow-y-auto h-[calc(150px-32px)]  scrollbar-none flex flex-col gap-1"
            ref={leftRef}
          >
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
                          <span className="text-yellow-500">[{el.coin}]</span>{" "}
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
      </div>
      <div className="w-full md:w-1/2 p-3">
        <div className="box w-full p-4 h-[150px] overflow-hidden">
          <div
            className="overflow-y-auto h-[calc(150px-32px)]  scrollbar-none flex flex-col gap-1"
            ref={rightRef}
          >
            {!loading && (
              <>
                {!right || right.length === 0 ? (
                  <EmptyText
                    className="text-gray-1"
                    text={t("no data available")}
                  />
                ) : (
                  <>
                    {right.map((el, idx) => {
                      return (
                        <p key={idx}>
                          <span className="text-yellow-500">[{el.id}]</span>{" "}
                          <span className="text-purple-2">{el.amount}</span>
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
    </div>
  );
};
