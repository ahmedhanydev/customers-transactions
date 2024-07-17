import React from "react";
import { CombinedData } from "../types";

interface Props {
  data: CombinedData[];
  filter: { name: string; amount: number };
  onSelectCustomer: (customer: number) => void;
  customer: number | null;
}

const CombinedTable: React.FC<Props> = ({
  data,
  filter,
  onSelectCustomer,
  customer,
}) => {
  const filteredData = data.filter((transaction) => {
    const matchesName = filter.name
      ? transaction.customerName
          .toLowerCase()
          .includes(filter.name.toLowerCase())
      : true;
    const matchesAmount = filter.amount
      ? transaction.amount >= filter.amount
      : true;
    return matchesName && matchesAmount;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-500 block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-slate-600 block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
            <th className="block md:table-cell p-2 border border-slate-600">
              Transaction ID
            </th>
            <th className="block md:table-cell p-2 border border-slate-600">
              Customer Name
            </th>
            <th className="block md:table-cell p-2 border border-slate-600">
              Customer ID
            </th>
            <th className="block md:table-cell p-2 border border-slate-600">
              Date
            </th>
            <th className="block md:table-cell p-2 border border-slate-600">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {filteredData.map((transaction) => {
            const isActive = transaction.customer_id === customer;
            return (
              <tr
                key={transaction.id}
                onClick={() => onSelectCustomer(transaction.customer_id)}
                className={`cursor-pointer border-b md:border-none block md:table-row ${
                  isActive ? "bg-blue-100" : ""
                }`}
              >
                <td className="block md:table-cell p-2 border border-slate-700">
                  {transaction.id}
                </td>
                <td className="block md:table-cell p-2 border border-slate-700">
                  {transaction.customerName}
                </td>
                <td className="block md:table-cell p-2 border border-slate-700">
                  {transaction.customer_id}
                </td>
                <td className="block md:table-cell p-2 border border-slate-700">
                  {transaction.date}
                </td>
                <td className="block md:table-cell p-2 border border-slate-700">
                  {transaction.amount}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CombinedTable;
