import { CoinPosition } from ".";

export type User = {
  id: number;
  first_name?: string;
  last_name?: string;
  name: string;
  email: string;
  phone?: string;
  token: string;
  coin_positions: CoinPosition[];
  session: boolean;
  isVerificated: number | null;
  countryCode: string | null;
  total_deposit: number | null;
};

export type UserRef = {
  ref_code: string;
  total_refs: number;
  total_refs_amount: number;
};

export type Balance = {
  [key: string]: number;
  ADA: number;
  BNB: number;
  BTC: number;
  DAI: number;
  DOT: number;
  ETH: number;
  LTC: number;
  SOL: number;
  TON: number;
  TRX: number;
  XLM: number;
  XRP: number;
  DOGE: number;
  SHIB: number;
  USDC: number;
  USDT: number;
  WBTC: number;
  MATIC: number;
};

export type BalanceRes = {
  balance: Balance | null;
};
