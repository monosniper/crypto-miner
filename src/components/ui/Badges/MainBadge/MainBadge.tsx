import { FC, MouseEventHandler } from "react";
import cn from "clsx";

type Props = {
  onClick?: MouseEventHandler<HTMLDivElement>;
  title: string;
};

export const MainBadge: FC<Props> = ({ onClick, title }) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center py-2 px-8 border border-base-border-100 rounded-[32px]",
        {
          "cursor-pointer": onClick,
        },
      )}
      onClick={onClick}
    >
      {title}
    </div>
  );
};
