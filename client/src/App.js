import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Stock from "./components/Stock";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/stock" element={<Stock />} />
    </Routes>
  );
}

export default App;
