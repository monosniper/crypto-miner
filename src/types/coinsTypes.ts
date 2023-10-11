export type Coin = {
  id: number;
  name: string;
  slug: string;
  rate: number;
  change: number;
  graph: number[];
  icon_url: string;
};

export interface CoinWithOrder extends Coin {
  order: number;
}

export type MyCoin = Pick<Coin, "slug" | "name" | "icon_url" | "id"> & {
  balance: number;
};
