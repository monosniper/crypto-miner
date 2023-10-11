import { PropsWithClassName, PropsWithSize } from "@/types";
import { FC } from "react";

export const ConverIcon: FC<PropsWithSize<PropsWithClassName>> = ({
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
        d="M12.3083 12.0417H7.74993L8.90827 10.8833C9.3672 10.3908 9.35366 9.62332 8.87764 9.1473C8.40162 8.67128 7.63412 8.65774 7.1416 9.11667L3.84993 12.45C3.7927 12.5101 3.73979 12.5741 3.6916 12.6417C3.69434 12.661 3.69434 12.6807 3.6916 12.7C3.6916 12.75 3.63327 12.8 3.60827 12.8583V12.9333C3.60348 12.986 3.60348 13.039 3.60827 13.0917C3.59965 13.172 3.59965 13.253 3.60827 13.3333C3.60008 13.4165 3.60008 13.5002 3.60827 13.5833C3.60351 13.6277 3.60351 13.6724 3.60827 13.7167V13.8167L3.68327 13.9583V14.0333C3.73153 14.0982 3.78445 14.1595 3.8416 14.2167L7.17493 17.55C7.41065 17.7822 7.7274 17.9137 8.05827 17.9167C8.5635 17.9162 9.01879 17.6117 9.21208 17.1449C9.40536 16.6781 9.29863 16.1408 8.9416 15.7833L7.74993 14.5417H12.3083C12.9986 14.5417 13.5583 13.982 13.5583 13.2917C13.5583 12.6013 12.9986 12.0417 12.3083 12.0417Z"
        fill="#58667E"
      />
      <path
        d="M16.3416 7.34167C16.3416 7.29167 16.3999 7.24167 16.4249 7.18333C16.4225 7.15839 16.4225 7.13328 16.4249 7.10833C16.4437 7.05697 16.4577 7.00396 16.4666 6.95C16.4752 6.86968 16.4752 6.78866 16.4666 6.70833C16.4748 6.6252 16.4748 6.54147 16.4666 6.45833C16.4566 6.41006 16.4426 6.36268 16.4249 6.31667V6.225C16.4004 6.17328 16.3725 6.12318 16.3416 6.075V6.00833C16.2824 5.94511 16.2183 5.8866 16.1499 5.83333L12.8583 2.5C12.3684 2.01712 11.5815 2.01712 11.0916 2.5C10.8555 2.73328 10.7225 3.0514 10.7225 3.38333C10.7225 3.71527 10.8555 4.03339 11.0916 4.26667L12.2499 5.43333H7.6916C7.00124 5.43333 6.4416 5.99298 6.4416 6.68333C6.4416 7.37369 7.00124 7.93333 7.6916 7.93333H12.2499L11.0916 9.09167C10.855 9.32638 10.7219 9.64587 10.7219 9.97917C10.7219 10.3125 10.855 10.632 11.0916 10.8667C11.3261 11.0997 11.6444 11.2288 11.9749 11.225C12.3048 11.2251 12.6217 11.0966 12.8583 10.8667L16.1499 7.53333C16.2072 7.47326 16.2601 7.40921 16.3083 7.34167H16.3416Z"
        fill="#58667E"
      />
    </svg>
  );
};