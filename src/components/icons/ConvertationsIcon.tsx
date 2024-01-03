import { PropsWithClassName, PropsWithSize } from "@/types";
import { FC } from "react";

export const ConvertationsIcon: FC<PropsWithSize<PropsWithClassName>> = ({
  className,
  width = 20,
  height = 20,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill="#000000"
      viewBox="0 0 16 16"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M9.25 6.12V4.87h-7l3-2.05-.71-1L.59 4.45A1.29 1.29 0 0 0 0 5.5a1.29 1.29 0 0 0 .59 1l3.93 2.72.71-1-3-2.06zm6.16 3.33-3.93-2.67-.71 1 3 2.06h-7v1.25h7.03l-3 2 .71 1 3.93-2.67a1.23 1.23 0 0 0 0-2.1z"></path>
      </g>
    </svg>
  );
};
