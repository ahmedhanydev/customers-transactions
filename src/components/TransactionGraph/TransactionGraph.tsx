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
import { CombinedData } from "../../types";
import "./TransactionGraph.css";
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
    <div className="graph-container">
      <h2 className="graph-header">
        {customerTransactions[0].customerName} ({customerTransactions.length}{" "}
        Transactions) | Total Amount = {totalAmount}
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#FF4C4C" />
          <YAxis stroke="#FF4C4C" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#06D001" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionGraph;
