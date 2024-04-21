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

export type BaseConfigurator = {
  cpu: string;
  ram: string;
  disk: string;
  gpu: string;
  gpu_count: string;
};

export type OcConfigurator = {
  oc: string;
};

export type Configuration = {
  type: string;
  location: string;
};

export type AdditionalConfigurator = {
  notifications: string;
  canFarmNft: string;
};

export type NetworkConfigurator = {
  ipv: string;
  ip_count: string;
  port: string;
  traffic: string;
};

export type ConfiguratorFormData = {
  configuration: Configuration;
  base: BaseConfigurator;
  oc: OcConfigurator;
  network: NetworkConfigurator;
  comment: string;
  additional: AdditionalConfigurator;
};
