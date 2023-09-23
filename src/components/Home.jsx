import { useState } from "react";
import { useEffect } from "react";
import StockList from "./StockList";

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.twelvedata.com/stocks")
      .then((res) => res.json())
      .then((payload) => setStocks(payload.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="home">{loading ? <p>Loading...</p> : <StockList stocks={stocks} />}</section>
  );
}

