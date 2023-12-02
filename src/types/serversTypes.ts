import { Coin } from "@/types";

export type Possibility = {
  id: number;
  name: string;
  slug: string | null;
  icon_url: string;
};

export type Log = {
  created_at: number;
  text: string;
};

export type Logs = {
  server: Log[];
  miner: Log[];
};

export enum ServerStatuses {
  WORK_STATUS = "work",
  ACTIVE_STATUS = "active",
  NOT_ACTIVE_STATUS = "not active",
  RELOAD_STATUS = "reload",
}

export enum ServerTypes {
  STANDART = "standart",
  FREE = "free",
  PRO = "pro",
  PREMIUM = "premium",
  ELITE = "elite",
  MAX = "max",
}

export type Server = {
  id: number;
  title: string;
  price: number;
  year_price: number;
  nft: number;
  isHot: number;
  work_started_at: null | string;
  active_until: string;
  status: ServerStatuses;
  possibilities: Possibility[];
  icon_url?: string;
  coins?: Coin[];
  server_user_name?: null | string;
  logs?: null | Logs;
  type?: ServerTypes;
};

export type SelectedServer = Pick<Server, "id" | "type" | "coins">;
