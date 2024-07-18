// type Props = {}

import { useEffect, useState } from "react";
import { CombinedData, Customer, Transaction } from "../../types";
// import axios from "axios";
import TransactionGraph from "../../components/TransactionGraph/TransactionGraph";
import data from "../../utils/db.json";
import "./HomePage.css";
import Table from "../../components/Table/Table";
import nodataImg from "../../assets/Nodata.svg";
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

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
    setSelectedCustomer(null);
  };
  const handleCustomerSelect = (customer: number) => {
    setSelectedCustomer(customer);
  };

  const filteredData = combinedData.filter((transaction) => {
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
    <div>
      <h1 className=" title">Customer Transactions</h1>
      <div className=" inputs-container ">
        <input
          type="text"
          name="name"
          placeholder="Filter by name"
          value={filter.name}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Filter by amount"
          value={filter.amount}
          onChange={handleFilterChange}
        />
      </div>

      {filteredData.length === 0 ? (
        <div>
          <img src={nodataImg} width={"40%"} />
        </div>
      ) : (
        <>
          <Table
            filteredData={filteredData}
            filter={filter}
            onSelectCustomer={handleCustomerSelect}
            customer={selectedCustomer}
          />
        </>
      )}

      {selectedCustomer && (
        <TransactionGraph
          transactions={combinedData}
          customer={selectedCustomer}
        />
      )}
    </div>
  );
};

export default HomePage;
