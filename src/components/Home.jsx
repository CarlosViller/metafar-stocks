import { useMemo, useState } from "react";
import { useEffect } from "react";
import StockList from "./StockList";
import SearchBar from "./SearchBar";
import { useQuery } from "../hooks/useQuery";

const PAGE_SIZE = 50;

function paginate(arr, currentPage) {
  return arr.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
}

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const query = useQuery();

  useEffect(() => {
    fetch("https://api.twelvedata.com/stocks")
      .then((res) => res.json())
      .then((payload) => setStocks(payload.data))
      .finally(() => setLoading(false));
  }, []);

  // Resetea 'page' a 1 cada vez que cambiamos de pagina o los query params cambian
  useEffect(() => setPage(1), [query]);

  /**
   * Crea una pagina stocks a mostrar, si no hay query params, significa que estamos en "/" y se usaran 
   * todas la stocks para la paginacion, en caso contrario, se filtrara las stocks dependiendo del input del usuario y luego
   * se hara la paginacion a partir de las stocks resultantes.
   */
  const pageStocks = useMemo(() => {
    if (query.size !== 0) {
      const type = query.get("type");
      const q = query.get("q");

      if (!type || !q) return [];

      const filteredStocks = stocks.filter((stock) => stock[type].includes(q));
      return paginate(filteredStocks, page);
    }

    return paginate(stocks, page);
  }, [page, query, stocks]);

  return (
    <section id="home">
      <SearchBar />
      {loading ? <p>Loading...</p> : <StockList stocks={pageStocks} />}
    </section>
  );
}
