import { PropsWithClassName, PropsWithSize } from "@/types";
import { FC } from "react";

export const HomeIcon: FC<PropsWithSize<PropsWithClassName>> = ({
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
        d="M12.0447 3.16933L16.2132 6.24828C17.0165 6.82967 17.4945 7.75926 17.5 8.75091V14.3246C17.4484 16.1118 15.9638 17.5223 14.1763 17.4825H5.83158C4.041 17.5267 2.55162 16.115 2.5 14.3246V8.75091C2.50549 7.75926 2.98349 6.82967 3.78684 6.24828L7.95526 3.16933C9.17235 2.27689 10.8276 2.27689 12.0447 3.16933ZM6.44741 14.143H13.5527C13.8797 14.143 14.1448 13.8779 14.1448 13.5509C14.1448 13.2239 13.8797 12.9588 13.5527 12.9588H6.44741C6.1204 12.9588 5.85531 13.2239 5.85531 13.5509C5.85531 13.8779 6.1204 14.143 6.44741 14.143Z"
        fill="#443274"
      />
    </svg>
  );
};
