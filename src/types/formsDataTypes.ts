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

export type NewPasswordFormData = {
  newPassword: string;
  newPasswordRepeat: string;
};

export type PersonalFormData = {
  first_name: string;
  last_name: string;
  name: string;
  phone: string;
  email: string;
};
