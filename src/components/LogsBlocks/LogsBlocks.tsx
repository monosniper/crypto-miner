import { FC, useRef, useEffect, useState } from "react";
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

const INITIAL_LOGS_COUNT = 15;

export const LogsBlocks: FC<Props> = ({
  loading,
  left = [],
  right = [],
  leftTwo = [],
  rightTwo = [],
}) => {
  const { t } = useTranslation();
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftTwoRef = useRef<HTMLDivElement>(null);
  const rightTwoRef = useRef<HTMLDivElement>(null);

  const [visibleLeft, setVisibleLeft] = useState<number>(INITIAL_LOGS_COUNT);
  const [visibleRight, setVisibleRight] = useState<number>(INITIAL_LOGS_COUNT);
  const [visibleLeftTwo, setVisibleLeftTwo] =
    useState<number>(INITIAL_LOGS_COUNT);
  const [visibleRightTwo, setVisibleRightTwo] =
    useState<number>(INITIAL_LOGS_COUNT);

  useEffect(() => {
    if (leftRef.current) {
      leftRef.current.scrollTo(0, leftRef.current.scrollHeight);
    }
  }, [left]);

  useEffect(() => {
    if (rightRef.current) {
      rightRef.current.scrollTo(0, rightRef.current.scrollHeight);
    }
  }, [right]);

  useEffect(() => {
    if (leftTwoRef.current) {
      leftTwoRef.current.scrollTo(0, leftTwoRef.current.scrollHeight);
    }
  }, [leftTwo]);

  useEffect(() => {
    if (rightTwoRef.current) {
      rightTwoRef.current.scrollTo(0, rightTwoRef.current.scrollHeight);
    }
  }, [rightTwo]);

  const renderLogs = (
    logs: (ServerLog | Found | Log)[],
    visibleCount: number
  ) => (
    <>
      {logs.length === 0 ? (
        <EmptyText className="text-gray-1" text={t("no data available")} />
      ) : (
        logs.slice(0, visibleCount).map((el, idx) => (
          <p key={idx} className="whitespace-nowrap">
            <span className="text-yellow-500">
              [{(el as ServerLog).coin || (el as Found).id}]
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
    <div className="flex flex-wrap -m-3">
      <div className={cn("w-full md:w-1/2 lg:w-1/4 p-3")}>
        <div className="box w-full p-4 h-[375px] overflow-hidden">
          <div
            className="overflow-y-auto h-[calc(390px-32px)] scrollbar-none flex flex-col gap-1"
            ref={leftRef}
          >
            {!loading && renderLogs(left, visibleLeft)}
            {left.length > visibleLeft && (
              <button
                className="text-purple-3"
                onClick={() => setVisibleLeft(visibleLeft + INITIAL_LOGS_COUNT)}
              >
                {t("show-more")}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={cn("w-full md:w-1/2 lg:w-1/4 p-3")}>
        <div className="box w-full p-4 h-[375px] overflow-hidden">
          <div
            className="overflow-y-auto h-[calc(375px-32px)] scrollbar-none flex flex-col gap-1"
            ref={rightRef}
          >
            {!loading && renderLogs(right, visibleRight)}
            {right.length > visibleRight && (
              <button
                className="text-purple-3"
                onClick={() =>
                  setVisibleRight(visibleRight + INITIAL_LOGS_COUNT)
                }
              >
                {t("show-more")}
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        className={cn("w-full md:w-1/2 lg:w-1/4 p-3")}
      >
        <div className="box w-full p-4 h-[375px] overflow-hidden">
          <div
            className="overflow-y-auto h-[calc(375px-32px)] scrollbar-none flex flex-col gap-1"
            ref={leftTwoRef}
          >
            {!loading && renderLogs(leftTwo, visibleLeftTwo)}
            {leftTwo.length > visibleLeftTwo && (
              <button
                className="text-purple-3"
                onClick={() =>
                  setVisibleLeftTwo(visibleLeftTwo + INITIAL_LOGS_COUNT)
                }
              >
                {t("show-more")}
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        className={cn("w-full md:w-1/2 lg:w-1/4 p-3")}
      >
        <div className="box w-full p-4 h-[375px] overflow-hidden">
          <div
            className="overflow-y-auto h-[calc(375px-32px)] scrollbar-none flex flex-col gap-1"
            ref={rightTwoRef}
          >
            {!loading && renderLogs(rightTwo, visibleRightTwo)}
            {rightTwo.length > visibleRightTwo && (
              <button
                className="text-purple-3"
                onClick={() =>
                  setVisibleRightTwo(visibleRightTwo + INITIAL_LOGS_COUNT)
                }
              >
                {t("show-more")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
