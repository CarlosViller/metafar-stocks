import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import StockDetail from "./components/StockDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/search" exact element={<Home />} />
          <Route path="/stock/:symbol" exact element={<StockDetail />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
