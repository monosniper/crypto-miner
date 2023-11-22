import { PropsWithClassName, PropsWithSize } from "@/types";
import { FC } from "react";

export const LightIcon: FC<PropsWithSize<PropsWithClassName>> = ({
  className,
  width = 20,
  height = 20,
}) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="#C1AAFF"
      className={className}
      width={width}
      height={height}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z"></path>{" "}
      </g>
    </svg>
  );
};
