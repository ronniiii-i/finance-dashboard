import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import SideNav from "./components/SideNav";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Reports from "./pages/Reports";
import Budgets from "./pages/Budgets";

import { TransactionsProvider } from "./context/TransactionsContext";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseApiKey = import.meta.env.VITE_SUPABASE_API_KEY;

import "./App.scss";

function App() {
  return (
    <Router>
      <TransactionsProvider
        supabaseUrl={supabaseUrl}
        supabaseApiKey={supabaseApiKey}
      >
        <div className="flex">
          <SideNav />
          <main className="full-width">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transaction />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/budgets" element={<Budgets />} />
            </Routes>
          </main>
        </div>

        <Analytics />
      </TransactionsProvider>
    </Router>
  );
}

export default App;
