import { PropsWithClassName, PropsWithSize } from "@/types";
import { FC } from "react";

export const CopyIcon: FC<PropsWithSize<PropsWithClassName>> = ({
  className,
  width = 20,
  height = 20,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 -0.5 25 25"
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.676 14.248C17.676 15.8651 16.3651 17.176 14.748 17.176H7.428C5.81091 17.176 4.5 15.8651 4.5 14.248V6.928C4.5 5.31091 5.81091 4 7.428 4H14.748C16.3651 4 17.676 5.31091 17.676 6.928V14.248Z"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
        <path
          d="M10.252 20H17.572C19.1891 20 20.5 18.689 20.5 17.072V9.75195"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};
