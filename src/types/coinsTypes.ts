export type Coin = {
  id: number | string;
  name: string;
  slug: string;
  rate: number;
  change: number;
  graph: number[];
  icon_url: string;
};

export interface CoinWithOrder extends Coin {
  order?: number;
}

export interface CoinWithHideAndOrder extends CoinWithOrder {
  hide?: boolean;
}

export type MyCoin = Pick<Coin, "slug" | "name" | "icon_url" | "id"> & {
  balance: number;
};
