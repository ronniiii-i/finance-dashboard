import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

import "../styles/NewTransactionForm.scss";

function NewTransactionForm({
  categories,
  popup,
  setPopup,
  supabaseUrl,
  supabaseApiKey,
  onTransactionAdded,
}) {
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

    // Generate a UUID for the transaction
    const transactionId = uuidv4();

    // Create the full date as before
    const fullDate = date && time ? new Date(`${date}T${time}`) : null;

    // Prepare the form data
    const formData = {
      id: transactionId, // UUID (string)
      note: description, // string
      type: selectedType, // string
      category: selectedCategory, // string
      amount: parseFloat(amount), // Ensure it's a number
      date: fullDate.toISOString(), // ISO string
    };

    // Send the data to the API using fetch
    fetch(`${supabaseUrl}/rest/v1/transactions`, {
      method: "POST",
      headers: {
        apikey: supabaseApiKey,
        Authorization: `Bearer ${supabaseApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Unauthorized or some other error");
        }

        // Check if the response has a body before parsing
        const text = await response.text();
        return text ? JSON.parse(text) : {};
      })
      .then((data) => {
        Swal.fire({
          title: "Success",
          text: "Transaction added",
          icon: "success",
        });
        setPopup(false);
        emptyForm();
        if (onTransactionAdded) {
          onTransactionAdded();
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

  return (
    <div id="newTransaction" className={`modal ${popup ? "" : "hidden"}`}>
      <div className="inner">
        <div className="head">
          <h3>Add New Transaction</h3>
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

          <button type="submit">Add Transaction</button>
        </form>
      </div>
    </div>
  );
}

export default NewTransactionForm;
