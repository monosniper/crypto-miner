import { FC, ReactNode, useRef } from "react";
import { EmptyText } from "../EmptyText/EmptyText";
import { useTranslation } from "react-i18next";
import { PropsWithClassName } from "@/types";
import cn from "clsx";

type Props = {
  title?: string;
  list?: (string | JSX.Element)[];
  children?: ReactNode;
};

export const LogsBlock: FC<PropsWithClassName<Props>> = ({
  className,
  title,
  list,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        className,
        "box w-full p-4 lg:p-6 h-[375px] overflow-hidden flex flex-col"
      )}
    >
      {title && <h5 className="text-base font-medium">{title}</h5>}

      {!children ? (
        <div
          className="overflow-y-auto flex-grow scrollbar-none flex flex-col gap-1 mt-4"
          ref={ref}
        >
          <>
            {!list || list.length === 0 ? (
              <EmptyText
                className="text-gray-1"
                text={t("no data available")}
              />
            ) : (
              <>
                {list.map((el, idx) => {
                  return (
                    <p key={idx} className="whitespace-nowrap">
                      {el}
                    </p>
                  );
                })}
              </>
            )}
          </>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
