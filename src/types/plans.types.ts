import { ServerTypes } from "./serversTypes";

export type ServerPlan = {
  id: number;
  title: string;
  price: number;
  nft: number;
  isHot: number;
  type: ServerTypes;
  coins: string[];
};
