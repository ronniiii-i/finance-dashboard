import { useState } from "react";

import { CiExport } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";

import Transactions from "../components/Transactions";
import NewTransactionForm from "../components/NewTransactionForm";

import { useTransactions } from "../context/TransactionsContext";

import { exportCSV } from "../utils/exportCSV";
import { exportPDF } from "../utils/exportPDF";

function Transaction() {
  const { transactions, summary } = useTransactions();
  const [popup, setPopup] = useState(false);
  const [popupMode, setPopupMode] = useState("");
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [exportPopup, setExportPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(15);

  
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;

  const handleExportCSV = () => {
    console.log(transactions);
    
    exportCSV({ mode: "transactions", summary, transactions });
  };

  const handleExportPDF = () => {
    exportPDF({ mode: "transactions", summary, transactions });
  };

  return (
    <section id="transactions">
      <div className="top flex justify-between">
        <div className="text">
          <h3>Transactions</h3>
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
      <div>
        <Transactions
          transactions={transactions}
          setCurrentPage={setCurrentPage}
          indexOfFirstTransaction={indexOfFirstTransaction}
          indexOfLastTransaction={indexOfLastTransaction}
          // recentTransactions={recentTransactions}
          currentPage={currentPage}
          transactionsPerPage={transactionsPerPage}
          setPopup={setPopup}
          popup={popup}
          setPopupMode={setPopupMode}
          popupMode={popupMode}
          setSelectedTransactionId={setSelectedTransactionId}
        />
      </div>

      {/* Popup */}
      <NewTransactionForm
        popup={popup}
        setPopup={setPopup}
        mode={popupMode}
        transactionId={selectedTransactionId}
      />
    </section>
  );
}

export default Transaction;
