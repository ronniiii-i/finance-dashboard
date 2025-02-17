import { useState, useEffect } from "react";

import { CiExport } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
  IoChevronForwardOutline,
  IoChevronBackOutline,
  IoFilterOutline,
} from "react-icons/io5";

import Transactions from "../components/Transactions";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import SpendingCategoryPieChart from "../components/SpendingPieChart";
import BudgetGauge from "../components/BudgetGauge";
import BudgetBreakdown from "../components/BudgetBreakdown";

import "../styles/dashboard.scss";

function Dashboard() {
  const [user, setUser] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);
  const [showFilter, setShowFilter] = useState(false);
  const timeRangeOptions = [
    { value: "7days", label: "Last 7 Days" },
    { value: "14days", label: "Last 2 Weeks" },
    { value: "1month", label: "Last Month" },
    { value: "3months", label: "Last 3 Months" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        "https://api.npoint.io/f06685e7b9e1b0776d0b/name",
        {
          headers: {
            "User-Agent": "CustomUserAgent", // Custom user-agent to bypass the warning
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true", // You can include both headers
          },
        }
      );
      const data = await res.json();

      setUser(data);
    };

    const fetchTransactions = async () => {
      const res = await fetch(
        "https://api.npoint.io/f06685e7b9e1b0776d0b/transactions",
        {
          headers: {
            "User-Agent": "CustomUserAgent", // Custom user-agent to bypass the warning
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true", // You can include both headers
          },
        }
      );
      const data = await res.json();

      const sortedData = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setTransactions(sortedData);
      setFilteredTransactions(sortedData);
    };

    const fetchCategories = async () => {
      const res = await fetch(
        "https://api.npoint.io/f06685e7b9e1b0776d0b/categories",
        {
          headers: {
            "User-Agent": "CustomUserAgent", // Custom user-agent to bypass the warning
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true", // You can include both headers
          },
        }
      );
      const data = await res.json();
      setCategories(data);
    };

    fetchUser();
    fetchTransactions();
    fetchCategories();
  }, []);

  const filterTransactions = (type) => {
    const filtered = transactions.filter(
      (transaction) => transaction.type === type
    );
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Function to calculate the total income for a given month
  const calculateMonthlyIncome = (month) => {
    return transactions
      .filter(
        (transaction) =>
          transaction.type === "income" &&
          new Date(transaction.date).getMonth() === month
      )
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  // Function to calculate the total expense for a given month
  const calculateMonthlyExpense = (month) => {
    return transactions
      .filter(
        (transaction) =>
          transaction.type === "expense" &&
          new Date(transaction.date).getMonth() === month
      )
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  // Function to calculate balance
  const calculateBalance = (income, expense) => {
    return income - expense;
  };

  // Get current month and previous month
  const currentMonth = new Date().getMonth();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;

  // Calculate the current month's income, expense, and balance
  const monthlyIncome = calculateMonthlyIncome(currentMonth);
  const monthlyExpense = calculateMonthlyExpense(currentMonth);
  const balance = calculateBalance(monthlyIncome, monthlyExpense);

  // Calculate the previous month's income, expense, and balance
  const lastMonthIncome = calculateMonthlyIncome(previousMonth);
  const lastMonthExpense = calculateMonthlyExpense(previousMonth);
  const lastMonthBalance = calculateBalance(lastMonthIncome, lastMonthExpense);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleFilter = () => {
    setShowFilter(!showFilter); // Toggle the state
  };

  const resetFilter = () => {
    setFilteredTransactions(transactions);
    setShowFilter(false); // Close the filter dropdown
  };

  const totalBudget = 5000; // Example total budget
  const totalSpent = 4200; // Example total spending
  const categoryExpenses = [
    { name: "Food", amount: 1000, budget: 1200},
    { name: "Transportation", amount: 800, budget: 1000 },
    { name: "Entertainment", amount: 200, budget: 500 },
  ]; // Example category expenses

  return (
    <section className="full-width">
      <div className="top flex justify-between">
        <div className="text">
          <h3>Dashboard</h3>
          <p>Hello, {user}!</p>
        </div>
        <div className="buttons flex align-center">
          <button className="flex align-center justify-center">
            <CiExport /> Export
          </button>
          <button className="flex align-center justify-center secondary">
            <IoMdAdd /> Add Entry
          </button>
        </div>
      </div>
      <div className="flex full-width">
        <div className="w-4">
          <div className="balances full-width grid g-af">
            <div className="stat flex column justify-center">
              <p>Monthly Income</p>
              <h2>£{monthlyIncome}</h2>
              <p className="flex align-center">
                {monthlyIncome > lastMonthIncome ? (
                  <>
                    <IoArrowUpCircleOutline className="green" />
                    {(
                      ((monthlyIncome - lastMonthIncome) / lastMonthIncome) *
                      100
                    ).toFixed(0)}
                    %
                  </>
                ) : (
                  <>
                    <IoArrowDownCircleOutline className="red" />
                    {(
                      ((lastMonthIncome - monthlyIncome) / lastMonthIncome) *
                      100
                    ).toFixed(0)}
                    %
                  </>
                )}{" "}
                vs last month
              </p>
            </div>
            <div className="stat flex column justify-center">
              <p>Monthly Expense</p>
              <h2>£{monthlyExpense}</h2>
              <p className="flex align-center">
                {monthlyExpense > lastMonthExpense ? (
                  <>
                    <IoArrowUpCircleOutline className="red" />
                    {(
                      ((monthlyExpense - lastMonthExpense) / lastMonthExpense) *
                      100
                    ).toFixed(0)}
                    %
                  </>
                ) : (
                  <>
                    <IoArrowDownCircleOutline className="green" />
                    {(
                      ((lastMonthExpense - monthlyExpense) / lastMonthExpense) *
                      100
                    ).toFixed(0)}
                    %
                  </>
                )}{" "}
                vs last month
              </p>
            </div>
            <div className="stat flex column justify-center">
              <p>Balance</p>
              <h2>£{balance}</h2>
              <p className="flex align-center">
                {balance > lastMonthBalance ? (
                  <>
                    <IoArrowUpCircleOutline className="green" />
                    {(
                      ((balance - lastMonthBalance) / lastMonthBalance) *
                      100
                    ).toFixed(0)}
                    %
                  </>
                ) : (
                  <>
                    <IoArrowDownCircleOutline className="red" />
                    {(
                      ((lastMonthBalance - balance) / lastMonthBalance) *
                      100
                    ).toFixed(0)}
                    %
                  </>
                )}{" "}
                vs last month
              </p>
            </div>
          </div>
          <div className="chart">
            <IncomeExpenseChart transactions={transactions} />
          </div>
          <div className="recent">
            <div className="top flex align-center justify-between">
              <h4>Recent Transactions</h4>
              <ul className={`filter ${showFilter ? "" : "overflow-hidden"}`}>
                <li
                  onClick={toggleFilter}
                  className="flex align-center justify-between"
                >
                  Filter <IoFilterOutline />
                </li>
                <div className={showFilter ? "show" : ""}>
                  <li onClick={() => filterTransactions("income")}>Income</li>
                  <li onClick={() => filterTransactions("expense")}>Expense</li>
                  <li onClick={resetFilter}>All</li> {/* Show all */}
                </div>
              </ul>
            </div>
            <Transactions transactions={currentTransactions} />
            <div className="pagination flex justify-between align-center">
              <p>
                Showing {indexOfFirstTransaction + 1} to{" "}
                {indexOfLastTransaction} of {filteredTransactions.length}{" "}
                results
              </p>
              <div className="buttons flex align-center">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <IoChevronBackOutline />
                </button>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredTransactions.length / transactionsPerPage)
                  }
                >
                  <IoChevronForwardOutline />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1">
          <SpendingCategoryPieChart
            transactions={transactions}
            categories={categories}
            timeRangeOptions={timeRangeOptions}
          />
          <BudgetGauge budget={totalBudget} spent={totalSpent} />
          <BudgetBreakdown
            categoryData={categoryExpenses}
            categories={categories}
          />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
