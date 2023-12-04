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
};

export type SessionData = {
  id: number;
  coins: Coin[];
  founds: Found[];
  servers: Server[];
};
