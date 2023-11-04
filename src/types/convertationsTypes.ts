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
