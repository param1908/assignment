import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import TransactionsTable from "./components/TransactionsTable";
import AddTransactions from "./components/AddTransactions";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<TransactionsTable />} />
          <Route path="/add-transaction" element={<AddTransactions />} />
        </Routes>
      </Router>
  );
}

export default App;
