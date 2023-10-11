import { PropsWithClassName, PropsWithSize } from "@/types";
import { FC } from "react";

export const PrevIcon: FC<PropsWithSize<PropsWithClassName>> = ({
  className,
  width = 24,
  height = 24,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M16 20.75C15.8009 20.751 15.6098 20.6717 15.47 20.53L7.46995 12.53C7.1775 12.2372 7.1775 11.7628 7.46995 11.47L15.47 3.47003C15.7655 3.19467 16.226 3.2028 16.5116 3.48841C16.7972 3.77402 16.8053 4.23452 16.53 4.53003L9.05995 12L16.53 19.47C16.8224 19.7628 16.8224 20.2372 16.53 20.53C16.3901 20.6717 16.199 20.751 16 20.75Z"
        fill="black"
      />
    </svg>
  );
};
