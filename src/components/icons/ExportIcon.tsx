import { PropsWithClassName, PropsWithSize } from "@/types";
import { FC } from "react";

export const ExportIcon: FC<PropsWithSize<PropsWithClassName>> = ({
  className,
  width = 20,
  height = 20,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M13.8162 3.75H5.48286C5.13769 3.75 4.85786 3.47018 4.85786 3.125C4.85786 2.77982 5.13769 2.5 5.48286 2.5H13.8162C14.1614 2.5 14.4412 2.77982 14.4412 3.125C14.4412 3.47018 14.1614 3.75 13.8162 3.75Z"
        fill="white"
      />
      <path
        d="M14.5079 11.047C14.6742 11.047 14.8335 11.1142 14.9495 11.2333C15.1932 11.4773 15.1932 11.8727 14.9495 12.1167L10.0912 16.9667C9.84718 17.2104 9.45188 17.2104 9.20786 16.9667L4.34953 12.1167C4.10582 11.8727 4.10582 11.4773 4.34953 11.2333C4.4656 11.1142 4.62488 11.047 4.7912 11.047C4.95752 11.047 5.11679 11.1142 5.23286 11.2333L9.02453 15.0167V5.66667C9.02453 5.32149 9.30435 5.04167 9.64953 5.04167C9.99471 5.04167 10.2745 5.32149 10.2745 5.66667V15.0167L14.0662 11.2333C14.1823 11.1142 14.3415 11.047 14.5079 11.047Z"
        fill="white"
      />
    </svg>
  );
};
