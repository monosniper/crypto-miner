export type ReplenishmentItem = {
  id: number;
  type: string;
  status: ReplenishmentStatuses;
  amount: number;
  description: string;
  purchase_type: string;
  purchase_id: null;
};

export enum ReplenishmentStatuses {
  FAILED = "failed",
  WAITING = "waiting",
  SUCCESS = "success",
  FINISHED = "finished",
}
