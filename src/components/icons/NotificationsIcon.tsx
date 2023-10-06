import { PropsWithClassName, PropsWithSize } from "@/types";
import { FC } from "react";

export const NotificationsIcon: FC<PropsWithSize<PropsWithClassName>> = ({
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
        d="M17.0055 11.6416C17.0079 12.1259 17.2208 12.5852 17.5888 12.9C18.8471 14.025 17.9555 15.95 16.1721 15.95H13.0055C12.595 17.0703 11.5319 17.8178 10.3388 17.825C9.14181 17.8301 8.07231 17.0781 7.67214 15.95H4.50547C2.72214 15.95 1.83047 14.025 3.08881 12.9C3.45683 12.5852 3.66975 12.1259 3.67214 11.6416V7.61663C3.67214 4.33329 6.65547 1.66663 10.3388 1.66663C14.0221 1.66663 17.0055 4.33329 17.0055 7.61663V11.6416ZM9.07214 15.95C9.3754 16.3425 9.8428 16.5731 10.3388 16.575C10.8231 16.563 11.2761 16.3334 11.5721 15.95H9.07214Z"
        fill="#5D636D"
      />
    </svg>
  );
};
