import { FC, useRef, useEffect } from "react";
import { EmptyText } from "..";
import { useTranslation } from "react-i18next";
import { Found, Log, ServerLog } from "@/types";
import cn from "clsx";
import moment from "moment";

type Props = {
  loading?: boolean;
  left?: ServerLog[];
  right?: Found[];
  leftTwo?: Log[];
  rightTwo?: Log[];
};

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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
      <div className={cn("w-full")}>
        <div className="box w-full p-4 h-[375px] overflow-hidden">
          <div
            className="overflow-y-auto h-[calc(390px-32px)] scrollbar-none flex flex-col gap-1"
            ref={leftRef}
          >
            {!loading && renderLogs(left)}
          </div>
        </div>
      </div>
      <div className={cn("w-full")}>
        <div className="box w-full p-4 h-[375px] overflow-hidden">
          <div
            className="overflow-y-auto h-[calc(375px-32px)] scrollbar-none flex flex-col gap-1"
            ref={rightRef}
          >
            {!loading && renderLogs(right)}
          </div>
        </div>
      </div>

      <div className={cn("w-full")}>
        <div className="box w-full p-4 h-[375px] overflow-hidden">
          <div
            className="overflow-y-auto h-[calc(375px-32px)] scrollbar-none flex flex-col gap-1"
            ref={leftTwoRef}
          >
            {!loading && renderLogs(leftTwo)}

            {!loading && renderLogs(rightTwo)}
          </div>
        </div>
      </div>
    </div>
  );
};
