import React from "react";
import { CombinedData } from "../../types";
import "./Table.css";
interface Props {
  filteredData: CombinedData[];
  filter: { name: string; amount: number };
  onSelectCustomer: (customer: number) => void;
  customer: number | null;
}

const Table: React.FC<Props> = ({
  filteredData,
  onSelectCustomer,
  customer,
}) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Customer Name</th>
            <th>Customer ID</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((transaction) => {
            const isActive = transaction.customer_id === customer;
            return (
              <tr
                key={transaction.id}
                onClick={() => onSelectCustomer(transaction.customer_id)}
                className={`${isActive ? "active" : ""}`}
              >
                <td>{transaction.id}</td>
                <td>{transaction.customerName}</td>
                <td>{transaction.customer_id}</td>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
