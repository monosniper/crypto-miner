export type PropsWithClassName<P = unknown> = P & {
  className?: string;
};

export type PropsWithSize<P = unknown> = P & {
  width?: number;
  height?: number;
  color?: string;
};

export type SelectItemWithIcon = {
  value: string;
  icon?: JSX.Element | string;
};

export type Settings = {
  telegram?: string;
  youtube?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  withdraw_fee?: string;
  convertation_fee?: string;
};
