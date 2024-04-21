import { Coin, ServerLog, Found } from "@/types";

export type Possibility = {
  id: number;
  name: string;
  slug: string | null;
  icon_url: string;
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
  name?: string;
  logs?: null | ServerLog[];
  founds?: null | Found[];
  type?: ServerTypes;
  server?: Server;
  last_work_at?: string;
};

export type Preset = {
  title: string;
  configuration: {
    oc: string;
    cpu: string;
    gpu: string;
    ipv: string;
    ram: string;
    disk: string;
    port: string;
    coins: string[];
    traffic: string;
    ip_count: string;
    location: string;
    gpu_count: string;
    canFarmNft: string;
    notifications: string;
  };
  price: number;
  isHot: number;
};

export type ConfiguratorField = {
  options: { price: number; title: string }[];
  slug: string;
  type: "text" | "select";
};

export type ConfigurationItem = {
  fields: ConfiguratorField[];
  slug: string;
};

export type SelectedServer = Pick<Server, "id" | "type" | "coins">;
