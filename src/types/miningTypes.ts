import { Coin, Server } from ".";

export type StartMinerSocketData = {
  message: string;
  data: {
    session_id: number;
  };
};

export type ServerLog = {
  coin: string;
  text: string;
  contrast: string;
  timestamp: string;
};

export type Found = {
  id: string;
  type: "coin" | "nft";
  amount: number;
  timestamp: string;
};

export type Session = {
  data: SessionData;
  success: boolean;
};

export type SessionData = {
  id: number;
  coins: Coin[];
  founds: Found[];
  servers: Server[];
  logs: Log[];
  end_at: Date;
  created_at: Date;
};

export type Log = {
  text: string;
  type: "miner" | "servers";
  contrast: string | null;
  timestamp: string;
};
