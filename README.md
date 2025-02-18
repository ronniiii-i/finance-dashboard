# Personal Finance Dashboard

## Overview

The **Personal Finance Dashboard** is a web application designed to help users track their transactions, categorize expenses, and visualize their financial data. The application utilizes Supabase as a backend service to store and retrieve transaction data.

## Features

- Add, edit, and delete transactions
- Categorize transactions (e.g., income, expenses)
- Display transactions in a sortable and filterable table
- Visualize spending patterns with charts
- Responsive design for mobile and desktop

## Technologies Used

- **Frontend:** React, Vite, SCSS
- **Backend:** Supabase (PostgreSQL)
- **Charts:** Chart.js
- **Libraries:** SweetAlert2, UUID

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/finance-dashboard.git
   cd finance-dashboard
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file and add the following:

   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_API_KEY=your-supabase-api-key
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

## Usage

1. Open the app in your browser (`http://localhost:5173` by default for Vite).
2. Add transactions via the form.
3. View, filter, and analyze your transactions.
4. Charts display real-time financial insights.

<!-- ## Folder Structure

```
📂 finance-dashboard
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 Dashboard.jsx
 ┃ ┃ ┣ 📜 NewTransactionForm.jsx
 ┃ ┃ ┣ 📜 TransactionList.jsx
 ┃ ┃ ┗ 📜 ChartVisualization.jsx
 ┃ ┣ 📜 App.jsx
 ┃ ┣ 📜 main.jsx
 ┣ 📜 package.json
 ┣ 📜 .env.example
 ┗ 📜 README.md
``` -->

## Contributing

1. Fork the repository.
2. Create a new branch:

   ```sh
   git checkout -b feature-name
   ```

3. Commit your changes:

   ```sh
   git commit -m "Add new feature"
   ```

4. Push the branch:

   ```sh
   git push origin feature-name
   ```

5. Open a pull request.

## License

This project is licensed under the MIT License.

---
Made with ❤️ by **Roni**.
