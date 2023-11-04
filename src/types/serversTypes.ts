export type Server = {
  id: number;
  title: string;
  price: number;
  year_price: number;
  nft: number;
  isHot: number;
  work_started_at: null | string;
  active_until: string;
  status: string;
};

export enum ServerStatuses {
  WORK_STATUS = "work",
  ACTIVE_STATUS = "active",
  NOT_ACTIVE_STATUS = "not active",
  RELOAD_STATUS = "reload",
}
