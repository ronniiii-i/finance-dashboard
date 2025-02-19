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
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [recentTransactions, setrecentTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    spending: { total: 0, breakdown: [] },
  });

  const fetchUser = async () => {
    try {
      const res = await fetch(
        `${supabaseUrl}/rest/v1/names?select=*`, // Replace 'users' with your table name
        {
          headers: {
            apikey: supabaseApiKey, // Replace with your Supabase API key
            Authorization: `Bearer ${supabaseApiKey}`, // Replace with your Supabase API key
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch user: ${res.statusText}`);
      }

      const data = await res.json();

      // Assuming the response is an array of users and you want the first user
      if (data.length > 0) {
        setUser(data[0]); // Set the first user in the array
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
    setFilteredTransactions(sortedData);
    setrecentTransactions(sortedData.slice(0, 30));
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
  }, [supabaseUrl, supabaseApiKey]);

  const filterTransactions = (type) => {
    const filtered = transactions.filter(
      (transaction) => transaction.type === type
    );
    setFilteredTransactions(filtered);
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
        filteredTransactions,
        categories,
        summary,
        recentTransactions,
        user,
        supabaseUrl,
        supabaseApiKey,
        setCategories,
        setrecentTransactions,
        calculateSummary,
        setSummary,
        setTransactions,
        filterTransactions,
        fetchTransactions,
        fetchCategories,
        setUser,
        fetchUser,
        setFilteredTransactions,
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
