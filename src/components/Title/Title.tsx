import { PropsWithClassName } from "@/types";
import { FC } from "react";
import cn from "clsx";

type Props = {
  title: string;
};

export const Title: FC<PropsWithClassName<Props>> = ({ className, title }) => {
  return (
    <h2
      className={cn(
        className,
        "font-semibold text-2xl text-base-content-100 -tracking-[0.48px]",
      )}
    >
      {title}
    </h2>
  );
};
