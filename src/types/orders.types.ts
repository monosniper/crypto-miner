export type OrderPostBody = {
  type: "donate" | "purchase"; // [purchase]
  purchase_type: "balance" | "server"; // (только если type purchase) [server]
  method: "crypto" | "card"; // [crypto]
  amount: number; // (только если type donate | purchase_type balance)
  purchase_id: number; // id сервера (только если purchase_type server)
};

export type OrderPatchBody = {
  method: "crypto" | "card";
  orders_id: number;
};
