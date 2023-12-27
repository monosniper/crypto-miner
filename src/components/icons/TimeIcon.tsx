import { PropsWithClassName, PropsWithSize } from "@/types";
import { FC } from "react";

export const TimeIcon: FC<PropsWithSize<PropsWithClassName>> = ({
  className,
  width = 20,
  height = 20,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M12 8V12L15 15"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
        ></path>{" "}
        <circle cx="12" cy="12" r="9" stroke="#000000" strokeWidth="2"></circle>{" "}
      </g>
    </svg>
  );
};
