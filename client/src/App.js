import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Stock from "./components/Stock";
import Billing from "./components/Billing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/stock" element={<Stock />} />
      <Route path="/billing" element={<Billing />} />
    </Routes>
  );
}

export default App;
