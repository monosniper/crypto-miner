import { FC, useRef, useEffect } from "react";
import { EmptyText } from "..";
import { useTranslation } from "react-i18next";
import { Found, Log, ServerLog } from "@/types";
import cn from "clsx";

type Props = {
  loading?: boolean;
  left?: ServerLog[];
  right?: Found[];
  leftTwo?: Log[];
  rightTwo?: Log[];
};

export const LogsBlocks: FC<Props> = ({
  loading,
  left,
  right,
  leftTwo,
  rightTwo,
}) => {
  const { t } = useTranslation();
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftTwoRef = useRef<HTMLDivElement>(null);
  const rightTwoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leftRef.current) return;

    leftRef.current.scrollTo(0, leftRef.current.scrollHeight);
  }, [left]);

  useEffect(() => {
    if (!rightRef.current) return;

    rightRef.current.scrollTo(0, rightRef.current.scrollHeight);
  }, [right]);

  useEffect(() => {
    if (!leftTwoRef.current) return;

    leftTwoRef.current.scrollTo(0, leftTwoRef.current.scrollHeight);
  }, [leftTwoRef]);

  useEffect(() => {
    if (!rightTwoRef.current) return;

    rightTwoRef.current.scrollTo(0, rightTwoRef.current.scrollHeight);
  }, [rightTwoRef]);

  return (
    <div className="flex flex-wrap -ml-6 w-[calc(100%+48px)] lg:w-full lg:-ml-3 -m-3">
      <div
        className={cn("w-1/2 p-3", {
          "sm:w-1/4": leftTwo || rightTwo,
          "sm:w-1/2": !leftTwo || !rightTwo,
        })}
      >
        <div className="box w-full p-4 h-[375px] overflow-hidden">
          <div
            className="overflow-y-auto h-[calc(390px-32px)]  scrollbar-none flex flex-col gap-1"
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
                        <p key={idx} className="whitespace-nowrap">
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
      <div
        className={cn("w-1/2 p-3", {
          "sm:w-1/4": leftTwo || rightTwo,
          "sm:w-1/2": !leftTwo || !rightTwo,
        })}
      >
        <div className="box w-full p-4 h-[375px] overflow-hidden">
          <div
            className="overflow-y-auto h-[calc(375px-32px)]  scrollbar-none flex flex-col gap-1"
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
                          <span className="text-purple-2">
                            <span className="text-base-content-100">
                              Found:{" "}
                            </span>
                            {el.amount || 0}
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

      {leftTwo && (
        <div
          className={cn("w-1/2 p-3", {
            "sm:w-1/4": left || right,
            "sm:w-1/2": !left || !right,
          })}
        >
          <div className="box w-full p-4 h-[375px] overflow-hidden">
            <div
              className="overflow-y-auto h-[calc(375px-32px)]  scrollbar-none flex flex-col gap-1"
              ref={leftTwoRef}
            >
              {!loading && (
                <>
                  {!leftTwo || leftTwo.length === 0 ? (
                    <EmptyText
                      className="text-gray-1"
                      text={t("no data available")}
                    />
                  ) : (
                    <>
                      {leftTwo.map((el, idx) => {
                        return (
                          <p key={idx}>
                            <span className="text-purple-2">
                              <span className="text-base-content-100">
                                {el.text}
                              </span>{" "}
                              {el.contrast && el.contrast}
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
      )}

      {rightTwo && (
        <div
          className={cn("w-1/2 p-3", {
            "sm:w-1/4": left || right,
            "sm:w-1/2": !left || !right,
          })}
        >
          <div className="box w-full p-4 h-[375px] overflow-hidden">
            <div
              className="overflow-y-auto h-[calc(375px-32px)]  scrollbar-none flex flex-col gap-1"
              ref={rightTwoRef}
            >
              {!loading && (
                <>
                  {!rightTwo || rightTwo.length === 0 ? (
                    <EmptyText
                      className="text-gray-1"
                      text={t("no data available")}
                    />
                  ) : (
                    <>
                      {rightTwo.map((el, idx) => {
                        return (
                          <p key={idx}>
                            <span className="text-purple-2">
                              <span className="text-base-content-100">
                                {el.text}
                              </span>{" "}
                              {el.contrast && el.contrast}
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
      )}
    </div>
  );
};
