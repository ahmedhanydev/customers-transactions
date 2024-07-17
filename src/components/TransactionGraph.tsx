import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CombinedData } from "../types";

interface Props {
  transactions: CombinedData[];
  customer: number;
}

const TransactionGraph = ({ transactions, customer }: Props) => {
  const customerTransactions = transactions.filter(
    (transaction) => transaction.customer_id === customer
  );

  const totalAmount = customerTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  const data = customerTransactions.map((transaction) => ({
    date: transaction.date,
    amount: transaction.amount,
  }));

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-6">
        {customerTransactions[0].customerName} ({customerTransactions.length}{" "}
        Transactions) | Total Amount = {totalAmount}
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionGraph;
