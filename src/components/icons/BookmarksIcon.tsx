import { PropsWithClassName, PropsWithSize } from "@/types";
import { FC } from "react";

export const BookmarksIcon: FC<PropsWithSize<PropsWithClassName>> = ({
  className,
  width = 21,
  height = 20,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
    >
      <path
        d="M14.3083 17.3203L10.7333 14.5786C10.3935 14.3202 9.92313 14.3202 9.58333 14.5786L5.975 17.3203C5.71187 17.5318 5.35314 17.5799 5.04356 17.4452C4.73398 17.3106 4.52464 17.0153 4.5 16.6786V4.96193C4.53232 4.27498 4.83721 3.62927 5.34713 3.16784C5.85705 2.70641 6.52992 2.46734 7.21667 2.5036H13.05C13.7409 2.47202 14.4156 2.7188 14.9231 3.18869C15.4305 3.65857 15.7284 4.31232 15.75 5.0036V16.6786C15.7176 17.0032 15.5136 17.2855 15.2155 17.4181C14.9175 17.5508 14.5712 17.5134 14.3083 17.3203Z"
        fill="#5B39B8"
      />
    </svg>
  );
};
