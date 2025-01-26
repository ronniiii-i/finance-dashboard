import "./App.scss";
import SideNav from "./components/SideNav";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Reports from "./pages/Reports";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="flex">
        <SideNav />
        <main className="full-width">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
