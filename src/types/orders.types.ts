export type OrderPostBody = {
  type?: "donate" | "purchase"; // [purchase]
  purchase_type?: "balance" | "server"; // (только если type purchase) [server]
  method?: "crypto" | "card"; // [crypto]
  amount?: number; // (только если type donate | purchase_type balance)
  purchase_id?: number; // id сервера (только если purchase_type server)
  configuration?: { [key: string]: string };
};

export type OrderPatchBody = {
  method: "crypto" | "card";
  orders_id: number;
};

export type Order = {
  success: boolean;
  data: {
    id: number;
    type: "donate" | "purchase";
    status: null;
    method: "crypto" | "card";
    amount: number;
    description: string;
    purchase_type: "balance" | "server";
    purchase_id: number | null;
    configuration: {
      oc: string;
      cpu: string;
      gpu: string;
      ipv: string;
      ram: string;
      disk: string;
      port: string;
      coins: string[];
      traffic: string;
      ip_count: string;
      location: string;
      gpu_count: string;
      canFarmNft: string;
      notifications: string;
      comment: string | null;
    };
    checkout_url: string | null;
  };
  message: string;
};
