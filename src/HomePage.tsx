// type Props = {}

import { useEffect, useState } from "react";
import { CombinedData, Customer, Transaction } from "./types";
// import axios from "axios";
import CombinedTable from "./components/CombinedTable";
import TransactionGraph from "./components/TransactionGraph";
import data from "./utils/db.json";

const HomePage = () => {
  const [combinedData, setCombinedData] = useState<CombinedData[]>([]);
  const [filter, setFilter] = useState({ name: "", amount: 0 });
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // JSON Server for local
      // const [customersResponse, transactionsResponse] = await Promise.all([
      //   axios.get("http://localhost:5000/customers"),
      //   axios.get("http://localhost:5000/transactions"),
      // ]);

      // const customers: Customer[] = customersResponse.data;
      // const transactions: Transaction[] = transactionsResponse.data;

      // for github pages
      const customers: Customer[] = data.customers;
      const transactions: Transaction[] = data.transactions;
      //*****/
      const combinedData = customers.reduce(
        (acc: { [key: number]: string }, customer) => {
          acc[customer.id] = customer.name;
          return acc;
        },
        {}
      );

      const dataWithCustomerNames = transactions.map((transaction) => ({
        ...transaction,
        customerName: combinedData[transaction.customer_id] || "Unknown",
      }));

      setCombinedData(dataWithCustomerNames);
    };
    fetchData();
  }, []);

  //   console.log(combinedData);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
  };
  const handleCustomerSelect = (customer: number) => {
    setSelectedCustomer(customer);
  };
  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4">Customer Transactions</h1>
      <div className="my-4 flex justify-center w-full  ">
        <div className="flex flex-col justify-center gap-2 md:flex-row w-full">
          <input
            type="text"
            name="name"
            placeholder="Filter by name"
            value={filter.name}
            onChange={handleFilterChange}
            className="border p-2 mr-2 w-full  md:w-auto  "
          />
          <input
            type="number"
            name="amount"
            placeholder="Filter by amount"
            value={filter.amount}
            onChange={handleFilterChange}
            className="border p-2  mr-2  w-full  md:w-auto"
          />
        </div>
      </div>
      <CombinedTable
        data={combinedData}
        filter={filter}
        onSelectCustomer={handleCustomerSelect}
        customer={selectedCustomer}
      />
      <div className="mt-6 flex justify-center">
        {selectedCustomer && (
          <TransactionGraph
            transactions={combinedData}
            customer={selectedCustomer}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
