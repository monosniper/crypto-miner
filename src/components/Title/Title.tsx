import { PropsWithClassName } from "@/types";
import { FC } from "react";
import cn from "clsx";

type Props = {
  title: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export const Title: FC<PropsWithClassName<Props>> = ({
  className,
  title,
  tag = "h2",
}) => {
  const Tag = tag;

  return (
    <Tag
      className={cn(
        className,
        "font-semibold text-2xl text-base-content-100 -tracking-[0.48px]",
      )}
    >
      {title}
    </Tag>
  );
};
