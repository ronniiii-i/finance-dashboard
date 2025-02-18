import { useState } from "react";

import Transactions from "../components/Transactions";
// import "../styles/add-transaction.scss";

function Transaction() {
  const [popup, setPopup] = useState(false);

  const transactions = [
    {
      id: 1,
      description: "Groceries",
      category: "Expense",
      amount: 50,
      date: "2025-01-05",
    },
    {
      id: 2,
      description: "Salary",
      category: "Income",
      amount: 1000,
      date: "2025-01-04",
    },
    {
      id: 3,
      description: "Electricity Bill",
      category: "Expense",
      amount: 75,
      date: "2025-01-03",
    },
    {
      id: 4,
      description: "Freelance Job",
      category: "Income",
      amount: 500,
      date: "2025-01-02",
    },
    {
      id: 5,
      description: "Netflix Subscription",
      category: "Expense",
      amount: 15,
      date: "2025-01-01",
    },
  ];

  return (
    <section id="transactions">
      <div
        className={`module ${
          popup ? "show-extend" : "hide"
        } flex  justify-center align-center`}
      >
        <h1
          onClick={() => {
            setPopup(!popup);
          }}
        >
          x
        </h1>
        <form className="flex column justify-between align-center full-width">
          <h2>Add Transaction</h2>
          <input type="text" placeholder="Description" />
          <input type="number" placeholder="Amount" />
          <select>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <input type="date" />
          <button className="button-secondary" type="submit">
            Add Transaction
          </button>
        </form>
      </div>
      <button
        className="button-secondary flex justify-center align-center"
        onClick={() => {
          setPopup(!popup);
        }}
      >
        Add New Transaction <h3>+</h3>
      </button>
      <div>
        <h2>Transactions</h2>
        <Transactions transactions={transactions} />
      </div>
    </section>
  );
}

export default Transaction;
