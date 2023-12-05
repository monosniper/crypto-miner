export type Coin = {
  id: number;
  name?: string;
  slug?: string;
  rate: number;
  change: number;
  graph: number[];
  graph_today: number[];
  icon_url?: string;

  hide?: boolean;
  balance?: number;
  hardLoad: number;
  money_balance?: number;
};

export type CoinPosition = {
  id: number;
  hide: boolean;
};
