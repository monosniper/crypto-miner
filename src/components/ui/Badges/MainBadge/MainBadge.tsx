import { FC, MouseEventHandler } from "react";
import cn from "clsx";
import { PropsWithClassName } from "@/types";

type Props = {
  onClick?: MouseEventHandler<HTMLDivElement>;
  title: string;
  active?: boolean;
};

export const MainBadge: FC<PropsWithClassName<Props>> = ({
  className,
  onClick,
  title,
  active = false
}) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center py-2 px-8 border border-base-border-100 rounded-[32px]",
        className,
        {
          "cursor-pointer": onClick,
          "border-primary": active
        },
      )}
      onClick={onClick}
    >
      {title}
    </div>
  );
};
