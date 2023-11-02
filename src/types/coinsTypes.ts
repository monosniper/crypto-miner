export type Coin = {
  id: number;
  name: string;
  slug: string;
  rate: number;
  change: number;
  graph: number[];
  icon_url: string;

  hide?: boolean;
  balance?: number;
};
