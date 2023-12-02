import { CoinPosition } from ".";

export type User = {
  id: number;
  name: string;
  email: string;
  token: string;
  coin_positions: CoinPosition[];
};

export type Balance = {
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
