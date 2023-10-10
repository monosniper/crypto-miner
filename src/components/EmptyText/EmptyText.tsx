import { PropsWithClassName } from "@/types";
import { FC } from "react";
import cn from "clsx";

type Props = {
  text: string;
};

export const EmptyText: FC<PropsWithClassName<Props>> = ({
  className,
  text = "",
}) => {
  return (
    <p
      className={cn(
        className,
        "italic text-base text-center flex justify-center items-center flex-grow",
      )}
    >
      {text}
    </p>
  );
};
