export enum WithdrawalStatuses {
  FAILED = "failed",
  PENDING = "pending",
  SUCCESS = "success",
}

export type WithdrawsItem = {
  id: number;
  amount: number;
  created_at: Date;
  status: WithdrawalStatuses;
};
