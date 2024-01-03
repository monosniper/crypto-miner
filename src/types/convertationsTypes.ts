export type Convertation = {
  id: number;
  coin: {
    from: string;
    to: string;
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
