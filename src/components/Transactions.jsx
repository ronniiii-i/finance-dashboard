/* eslint-disable react/prop-types */
import {
  IoFilterOutline,
  IoChevronForwardOutline,
  IoChevronBackOutline,
} from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useTransactions } from "../context/TransactionsContext";
import Filter from "./Filter";
import "../styles/transactions.scss";

function Transactions({
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
    recentTransactions,
    setRecentTransactions,
    dashboardFilteredTransactions,
    transactionsPageFilteredTransactions,
    filterDashboardTransactions,
    filterTransactionsPage,
    fetchTransactions,
  } = useTransactions();

  const [showFilter, setShowFilter] = useState(false);

  // Use the correct filtered transactions based on the page
  const filteredTransactions =
    page === "dashboard"
      ? dashboardFilteredTransactions
      : transactionsPageFilteredTransactions;

  const handleApplyFilters = (filters) => {
    if (page === "dashboard") {
      filterDashboardTransactions(filters.type); // Example: Filter by type for dashboard
    } else {
      filterTransactionsPage(filters); // Apply full filter logic for transactions page
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

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
    <>
      <div className="transactions">
        <div className="top flex align-center justify-between">
          <h4>{page ? `Recent` : "Your"} Transactions</h4>

          {!page && (
            <Filter
              show={showFilter}
              onClose={toggleFilter}
              onApply={handleApplyFilters} // Pass the apply filters function
            />
          )}

          <ul className={`filter ${showFilter ? "" : "overflow-hidden"}`}>
            <li
              onClick={toggleFilter}
              className="flex align-center justify-between"
            >
              Filter <IoFilterOutline />
            </li>
            {page && (
              <div className={showFilter ? "show" : ""}>
                <li
                  onClick={() => {
                    filterDashboardTransactions("income");
                    toggleFilter();
                  }}
                >
                  Income
                </li>
                <li
                  onClick={() => {
                    filterDashboardTransactions("expense");
                    toggleFilter();
                  }}
                >
                  Expense
                </li>
                <li
                  onClick={() => {
                    filterDashboardTransactions("all");
                    toggleFilter();
                  }}
                >
                  All
                </li>
              </div>
            )}
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
                        className="icon"
                        onClick={() => {
                          setSelectedTransactionId(transaction.id);
                          setPopup(true);
                          setPopupMode("edit");
                        }}
                      >
                        <BiEditAlt />
                      </button>
                      <button
                        className="icon delete"
                        onClick={() => handleDelete(transaction.id)}
                      >
                        <MdDelete />
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
            Showing {indexOfFirstTransaction + 1} to{" "}
            {recentTransactions.length <= indexOfFirstTransaction + 1 + 14
              ? recentTransactions.length
              : indexOfLastTransaction}{" "}
            of {recentTransactions.length} results
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
    </>
  );
}

export default Transactions;
