import { Nft } from ".";

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
  nft?: null | Nft;
  type?: "nft" | "coin";
};

export type WithdrawsBody = {
  wallet?: string;
  amount?: number;
  user_id?: number;

  type?: "nft" | "coin";
  nft_id?: number;
};
