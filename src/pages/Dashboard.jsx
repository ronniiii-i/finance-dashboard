import { useState } from "react";

import { CiExport } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

import { useTransactions } from "../context/TransactionsContext";

import Transactions from "../components/Transactions";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import SpendingCategoryPieChart from "../components/SpendingPieChart";
import BudgetGauge from "../components/BudgetGauge";
import BudgetBreakdown from "../components/BudgetBreakdown";
import NewTransactionForm from "../components/NewTransactionForm";

import { exportCSV } from "../utils/exportCSV";
import { exportPDF } from "../utils/exportPDF";

import "../styles/dashboard.scss";

function Dashboard() {
  const [popup, setPopup] = useState(false);
  const [popupMode, setPopupMode] = useState("");
  const [exportPopup, setExportPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);
  const timeRangeOptions = [
    { value: "7days", label: "Last 7 Days" },
    { value: "14days", label: "Last 2 Weeks" },
    { value: "1month", label: "Last Month" },
    { value: "3months", label: "Last 3 Months" },
  ];

  const { transactions, recentTransactions, user, categories, summary } =
    useTransactions();

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  // const currentTransactions = recentTransactions;

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

  const totalBudget = 5000; // Example total budget
  const totalSpent = 4200; // Example total spending
  const categoryExpenses = [
    { name: "Food", amount: 1000, budget: 1200 },
    { name: "Transportation", amount: 800, budget: 1000 },
    { name: "Entertainment", amount: 200, budget: 500 },
  ]; // Example category expenses

  const handleExportCSV = () => {
    console.log(recentTransactions);

    exportCSV({ mode: "dashboard", summary, recentTransactions });
  };

  const handleExportPDF = () => {
    exportPDF({ mode: "dashboard", summary, recentTransactions });
  };

  return (
    <section className="full-width">
      <div className="top flex justify-between">
        <div className="text">
          <h3>Dashboard</h3>
          <p>Hello, {user.name}!</p>
        </div>
        <div className="buttons flex align-center">
          <button
            className="flex align-center justify-center"
            onClick={() => setExportPopup(true)}
          >
            <CiExport /> Export
          </button>
          <button
            className="flex align-center justify-center secondary"
            onClick={() => {
              setPopup(true);
              setPopupMode("add");
            }}
          >
            <IoMdAdd /> Add Entry
          </button>
        </div>
        <div className={`export-popup ${exportPopup ? "active" : ""}`}>
          <div className="inner">
            <div className="head">
              <h3>Export Options</h3>
              <span
                className="close"
                onClick={() => {
                  setExportPopup(false);
                }}
              >
                x
              </span>
            </div>
            <button onClick={handleExportCSV}>Export CSV</button>
            <button onClick={handleExportPDF}>Export PDF</button>
          </div>
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
            <Transactions
              transactions={transactions}
              page="dashboard"
              setCurrentPage={setCurrentPage}
              indexOfFirstTransaction={indexOfFirstTransaction}
              indexOfLastTransaction={indexOfLastTransaction}
              // recentTransactions={recentTransactions}
              currentPage={currentPage}
              transactionsPerPage={transactionsPerPage}
            />
          </div>
        </div>
        <div className="w-1">
          <SpendingCategoryPieChart
            transactions={transactions}
            categories={categories}
            timeRangeOptions={timeRangeOptions}
            // onSummaryUpdate={handleSummaryUpdate}
          />
          <BudgetGauge budget={totalBudget} spent={totalSpent} />
          <BudgetBreakdown
            categoryData={categoryExpenses}
            categories={categories}
          />
        </div>
      </div>
      {/* Popup */}
      <NewTransactionForm
        categories={categories}
        popup={popup}
        setPopup={setPopup}
        mode={popupMode}
        // onTransactionAdded={fetchTransactions}
      />
    </section>
  );
}

export default Dashboard;
