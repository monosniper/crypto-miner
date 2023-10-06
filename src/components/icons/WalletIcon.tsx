import { PropsWithClassName, PropsWithSize } from "@/types";
import { FC } from "react";

export const WalletIcon: FC<PropsWithSize<PropsWithClassName>> = ({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.3334 13.1818C18.3334 15.2738 16.6375 16.9697 14.5455 16.9697H5.45463C3.36264 16.9697 1.66675 15.2738 1.66675 13.1818V7.12121C1.66675 5.02923 3.36264 3.33334 5.45463 3.33334H14.5455C16.6375 3.33334 18.3334 5.02923 18.3334 7.12121V13.1818ZM18.3334 11.0682V9.23485H14.5455C14.0393 9.23485 13.6289 9.64526 13.6289 10.1515C13.6289 10.6578 14.0393 11.0682 14.5455 11.0682H18.3334Z"
        fill="#58667E"
      />
    </svg>
  );
};
