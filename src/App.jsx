import "./App.scss";
import SideNav from "./components/SideNav";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Reports from "./pages/Reports";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseApiKey = import.meta.env.VITE_SUPABASE_API_KEY;

function App() {
  return (
    <Router>
      <div className="flex">
        <SideNav />
        <main className="full-width">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  supabaseUrl={supabaseUrl}
                  supabaseApiKey={supabaseApiKey}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  supabaseUrl={supabaseUrl}
                  supabaseApiKey={supabaseApiKey}
                />
              }
            />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
