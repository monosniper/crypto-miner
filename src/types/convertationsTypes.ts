export type Convertation = {
  id: number;
  coin: {
    from: number;
    to: number;
  };
  amount: {
    from: number;
    to: number;
  };
  created_at: Date;
};

export type ConvertationBody = {
  coin_from_id: number;
  coin_to_id: number;
  amount: number;
};
