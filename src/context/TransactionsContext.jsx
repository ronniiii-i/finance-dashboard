/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";

const TransactionsContext = createContext();

export const TransactionsProvider = ({
  supabaseUrl,
  supabaseApiKey,
  children,
}) => {
  const [user, setUser] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [dashboardFilteredTransactions, setDashboardFilteredTransactions] =
    useState([]);
  const [
    transactionsPageFilteredTransactions,
    setTransactionsPageFilteredTransactions,
  ] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    spending: { total: 0, breakdown: [] },
  });

  const fetchUser = async () => {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/names?select=*`, {
        headers: {
          apikey: supabaseApiKey,
          Authorization: `Bearer ${supabaseApiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch user: ${res.statusText}`);
      }

      const data = await res.json();

      if (data.length > 0) {
        setUser(data[0]);
      } else {
        console.error("No user found");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchTransactions = useCallback(async () => {
    const res = await fetch(`${supabaseUrl}/rest/v1/transactions?select=*`, {
      headers: {
        apikey: supabaseApiKey,
        Authorization: `Bearer ${supabaseApiKey}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    setTransactions(sortedData);
    setDashboardFilteredTransactions(sortedData); // Initialize dashboard filter
    setTransactionsPageFilteredTransactions(sortedData); // Initialize transactions page filter
    setRecentTransactions(sortedData.slice(0, 30));
  }, [supabaseUrl, supabaseApiKey]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const fetchCategories = async () => {
    const res = await fetch(`${supabaseUrl}/rest/v1/categories?select=*`, {
      headers: {
        apikey: supabaseApiKey,
        Authorization: `Bearer ${supabaseApiKey}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
    fetchUser();
  }, [supabaseUrl, supabaseApiKey]);

  // Filter logic for the Dashboard
  const filterDashboardTransactions = (type) => {
    if (type === "all") {
      setDashboardFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter(
        (transaction) => transaction.type === type
      );
      setDashboardFilteredTransactions(filtered);
    }
  };

  // Filter logic for the Transactions page
  const filterTransactionsPage = (filters) => {
    const filtered = transactions.filter((transaction) => {
      // Apply filter logic based on the `filters` object
      return (
        (!filters.type || transaction.type === filters.type) &&
        (!filters.startDate ||
          new Date(transaction.date) >= new Date(filters.startDate)) &&
        (!filters.endDate ||
          new Date(transaction.date) <= new Date(filters.endDate)) &&
        (!filters.selectedCategories.length ||
          filters.selectedCategories.includes(transaction.category)) &&
        transaction.amount >= filters.minAmount &&
        transaction.amount <= filters.maxAmount
      );
    });
    setTransactionsPageFilteredTransactions(filtered);
  };

  const calculateSummary = useCallback(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);
    setSummary({
      income,
      expense,
      balance: income - expense,
      spending: { total: expense, breakdown: [] },
    });
  }, [transactions]);

  useEffect(() => {
    calculateSummary();
  }, [calculateSummary]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        dashboardFilteredTransactions,
        transactionsPageFilteredTransactions,
        categories,
        summary,
        recentTransactions,
        user,
        supabaseUrl,
        supabaseApiKey,
        setRecentTransactions,
        filterDashboardTransactions,
        filterTransactionsPage,
        fetchTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

TransactionsProvider.propTypes = {
  supabaseUrl: PropTypes.string.isRequired,
  supabaseApiKey: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export const useTransactions = () => useContext(TransactionsContext);
