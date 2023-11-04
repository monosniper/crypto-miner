import { PropsWithClassName, PropsWithSize } from "@/types";
import { FC } from "react";

export const MoreInfoIcon: FC<PropsWithSize<PropsWithClassName>> = ({
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
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <circle
          cx="18"
          cy="12"
          r="1.5"
          transform="rotate(90 18 12)"
          fill="#080341"
        ></circle>{" "}
        <circle
          cx="12"
          cy="12"
          r="1.5"
          transform="rotate(90 12 12)"
          fill="#080341"
        ></circle>{" "}
        <circle
          cx="6"
          cy="12"
          r="1.5"
          transform="rotate(90 6 12)"
          fill="#080341"
        ></circle>{" "}
      </g>
    </svg>
  );
};
