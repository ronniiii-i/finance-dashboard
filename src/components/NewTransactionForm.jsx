import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

import { useTransactions } from "../context/TransactionsContext";

import "../styles/NewTransactionForm.scss";

function NewTransactionForm({ popup, setPopup, mode, transactionId }) {
  const { categories, supabaseUrl, supabaseApiKey, fetchTransactions } =
    useTransactions();

  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const filteredCategories = categories.filter(
    (category) => category.type === selectedType
  );

  const emptyForm = () => {
    setDescription("");
    setSelectedType("");
    setSelectedCategory("");
    setAmount("");
    setDate("");
    setTime("");
  };

 const handleSubmit = (event) => {
   event.preventDefault();

   // Generate a UUID for new transactions, reuse ID for edits
   const id = mode === "edit" ? transactionId : uuidv4();

   // Create the full date
   const fullDate = date && time ? new Date(`${date}T${time}`) : null;
   const formattedDate = fullDate ? fullDate.toISOString() : null;

   // Prepare form data
   const formData = {
     note: description,
     type: selectedType,
     category: selectedCategory,
     amount: parseFloat(amount),
     date: formattedDate,
   };

   // Determine request method & endpoint
   const requestOptions = {
     method: mode === "edit" ? "PATCH" : "POST",
     headers: {
       apikey: supabaseApiKey,
       Authorization: `Bearer ${supabaseApiKey}`,
       "Content-Type": "application/json",
     },
     body: JSON.stringify(formData),
   };

   const url =
     mode === "edit"
       ? `${supabaseUrl}/rest/v1/transactions?id=eq.${id}` // Update existing transaction
       : `${supabaseUrl}/rest/v1/transactions`; // Create new transaction

   fetch(url, requestOptions)
     .then(async (response) => {
       if (!response.ok) {
         throw new Error("Unauthorized or some other error");
       }
       return response.text().then((text) => (text ? JSON.parse(text) : {}));
     })
     .then(() => {
       Swal.fire({
         title: "Success",
         text: mode === "edit" ? "Transaction updated" : "Transaction added",
         icon: "success",
       });
       setPopup(false);
       emptyForm();
       if (fetchTransactions) {
         fetchTransactions();
       }
     })
     .catch((error) => {
       console.error("Error:", error);
       Swal.fire({
         icon: "error",
         title: "Oops...",
         text: "Something went wrong!",
       });
     });
 };


  useEffect(() => {
    if (mode === "edit" && transactionId) {
      fetch(`${supabaseUrl}/rest/v1/transactions?id=eq.${transactionId}`, {
        headers: {
          apikey: supabaseApiKey,
          Authorization: `Bearer ${supabaseApiKey}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const transaction = data[0];
            setDescription(transaction.note);
            setSelectedType(transaction.type);
            setSelectedCategory(transaction.category);
            setAmount(transaction.amount);
            const transactionDate = new Date(transaction.date);
            setDate(transactionDate.toISOString().split("T")[0]);
            setTime(transactionDate.toISOString().split("T")[1].slice(0, 5));
          }
        })
        .catch((error) => console.error("Error fetching transaction:", error));
    }
  }, [mode, supabaseApiKey, supabaseUrl, transactionId]);

  return (
    <div id="newTransaction" className={`modal ${popup ? "" : "hidden"}`}>
      <div className="inner">
        <div className="head">
          <h3>
            {mode == "add" && `Add New`} {mode == "edit" && "Edit"} Transaction
          </h3>
          <span
            className="close"
            onClick={() => {
              setPopup(false);
              emptyForm();
            }}
          >
            x
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              required
            />
          </div>

          <div className="input-block">
            <label>Transaction Type:</label>
            <select value={selectedType} onChange={handleTypeChange} required>
              <option value=""></option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="input-block">
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              required
            >
              <option value="" disabled>
                Select
              </option>
              {selectedType &&
                filteredCategories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="input-block">
            <label>Transaction Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              required
            />
          </div>

          <div className="input-block">
            <label>Transaction Date:</label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              required
            />
          </div>

          <div className="input-block">
            <label>Transaction Time:</label>
            <input
              type="time"
              value={time}
              onChange={handleTimeChange}
              required
            />
          </div>

          <button type="submit">
            {mode == "add" && "Add Transaction"}
            {mode == "edit" && "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
NewTransactionForm.propTypes = {
  popup: PropTypes.bool.isRequired,
  setPopup: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  transactionId: PropTypes.string,
};

export default NewTransactionForm;
