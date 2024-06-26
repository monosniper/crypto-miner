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

export type PartnershipItem = {
  title: string;
  description: string;
};

export type Settings = {
  telegram?: string;
  youtube?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  withdraw_fee?: string;
  convertation_fee?: string;
  transfer_min?: string;
  transfer_fee?: string;
  partnership: {
    1: PartnershipItem;
    2: PartnershipItem;
  };
  landing_video: string | null;
  how_video: string | null;
  wallet_usdt: string | null;
  coin_prices: { [key: string]: string };
  offers_mail?: string;
  work_mail?: string;
};
