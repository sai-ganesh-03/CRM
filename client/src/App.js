import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Stock from "./components/Stock";
import Billing from "./components/Billing";
import BillList from "./components/BillList";
import Invoice from "./components/Invoice";
import Error404 from "./components/Error404";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/stock" element={<Stock />} />
      <Route path="/billing" element={<Billing />} />
      <Route path="/billing/list" element={<BillList />} />
      <Route path="/invoice/:billId" element={<Invoice />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
