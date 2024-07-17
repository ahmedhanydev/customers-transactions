export interface Customer {
  id: number;
  name: string;
}

export interface Transaction {
  id: number;
  customer_id: number;
  date: string;
  amount: number;
}

export interface CombinedData extends Transaction {
  customerName: string;
}
