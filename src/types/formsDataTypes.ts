export type WithdrawalFormData = {
  amount: number;
  wallet: string;
};

export type ReplenishmentFormData = {
  amount: number;
};

export type TransferFormData = {
  amount: number;
  nickname: string;
};

export type PasswordRecoveryFormData = {
  email: string;
};
