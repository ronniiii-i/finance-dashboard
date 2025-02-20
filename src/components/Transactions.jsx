/* eslint-disable react/prop-types */
import {
  IoFilterOutline,
  IoChevronForwardOutline,
  IoChevronBackOutline,
} from "react-icons/io5";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useTransactions } from "../context/TransactionsContext";

import "../styles/transactions.scss";

function Transactions({
  // transactions,
  page,
  indexOfFirstTransaction,
  indexOfLastTransaction,
  currentPage,
  transactionsPerPage,
  setCurrentPage,
  setPopup,
  setPopupMode,
  setSelectedTransactionId,
}) {
  const {
    supabaseUrl,
    supabaseApiKey,
    filteredTransactions,
    filterTransactions,
    fetchTransactions,
  } = useTransactions();
  const [showFilter, setShowFilter] = useState(false);
  // const [filteredTransactions, setFilteredTransactions] =
  // useState(transactions);
  const [recentTransactions, setRecentTransactions] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter); // Toggle the state
  };

  // const filterTransactions = (type) => {
  //   if (type === "all") {
  //     setFilteredTransactions(transactions); // Reset to all transactions
  //   } else {
  //     const filtered = transactions.filter(
  //       (transaction) => transaction.type === type
  //     );
  //     setFilteredTransactions(filtered); // Filter by type
  //   }
  //   setShowFilter(false); // Close the filter dropdown
  // };

  // const resetFilter = () => {
  //   setFilteredTransactions(transactions); // Reset to all transactions
  //   setShowFilter(false); // Close the filter dropdown
  // };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/transactions?id=eq.${id}`,
        {
          method: "DELETE",
          headers: {
            apikey: supabaseApiKey,
            Authorization: `Bearer ${supabaseApiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      Swal.fire({
        title: "Deleted!",
        text: "Transaction has been removed",
        icon: "success",
      });

      fetchTransactions();
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete transaction!",
      });
    }
  };

  useEffect(() => {
    if (page === "dashboard") {
      setRecentTransactions(filteredTransactions.slice(0, 30));
    } else {
      setRecentTransactions(filteredTransactions);
    }
  }, [page, filteredTransactions]);

  const currentTransactions = recentTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="transactions">
      <div className="top flex align-center justify-between">
        <h4>{page ? `Recent` : "Your"} Transactions</h4>
        <ul className={`filter ${showFilter ? "" : "overflow-hidden"}`}>
          <li
            onClick={toggleFilter}
            className="flex align-center justify-between"
          >
            Filter <IoFilterOutline />
          </li>
          <div className={showFilter ? "show" : ""}>
            <li
              onClick={() => {
                filterTransactions("income");
                toggleFilter();
              }}
            >
              Income
            </li>
            <li
              onClick={() => {
                filterTransactions("expense");
                toggleFilter();
              }}
            >
              Expense
            </li>
            <li
              onClick={() => {
                filterTransactions("all");
                toggleFilter();
              }}
            >
              All
            </li>{" "}
            {/* Reset filter */}
            {/* <li onClick={resetFilter}>All</li> Reset filter */}
          </div>
        </ul>
      </div>
      <table className="full-width">
        <thead>
          <tr>
            <th>Description</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            {page != "dashboard" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction) => {
            const formattedDate = formatDate(transaction.date);
            return (
              <tr key={transaction.id}>
                <td>{transaction.note}</td>
                <td>
                  {transaction.type.charAt(0).toUpperCase() +
                    transaction.type.slice(1)}
                </td>
                <td>{transaction.category}</td>
                <td>£{transaction.amount}</td>
                <td>{formattedDate}</td>
                {page != "dashboard" && (
                  <td className="flex">
                    <button
                      onClick={() => {
                        setSelectedTransactionId(transaction.id);
                        setPopup(true);
                        setPopupMode("edit");
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(transaction.id)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination flex justify-between align-center">
        <p>
          Showing {indexOfFirstTransaction + 1} to {indexOfLastTransaction} of{" "}
          {recentTransactions.length} results
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
              Math.ceil(recentTransactions.length / transactionsPerPage)
            }
          >
            <IoChevronForwardOutline />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
