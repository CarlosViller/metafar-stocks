import { useMemo, useState } from "react";
import { useEffect } from "react";
import StockList from "./StockList";
import SearchBar from "./SearchBar";
import { useQuery } from "../hooks/useQuery";
import { Pagination } from "@mui/material";
import Error from "./Error";
import { API_ENDPOINT } from "../constants";
import Loading from "./Loading";

function paginate(arr, currentPage) {
  const PAGE_SIZE = 50;
  return arr.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
}

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const query = useQuery();

  useEffect(() => {
    fetch(`${API_ENDPOINT}/stocks?country=US`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((payload) => {
        setStocks(payload.data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
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

      const filteredStocks = stocks.filter((stock) =>
        stock[type].toLowerCase().includes(q.toLowerCase())
      );
      return paginate(filteredStocks, page);
    }

    return paginate(stocks, page);
  }, [page, query, stocks]);

  if (error) return <Error />;

  return (
    <section id="home">
      <SearchBar />
      {loading ? (
        <Loading />
      ) : (
        <section>
          <StockList stocks={pageStocks} />
          <Pagination
            page={page}
            onChange={(e, value) => {
              setPage(value);
              window.scrollTo(0, 0);
            }}
            count={stocks.length}
            color="primary"
            sx={{
              marginTop: "35px",
              "&>ul": {
                justifyContent: "center",
                flexWrap: "nowrap",
              },
            }}
            shape="rounded"
          />
        </section>
      )}
    </section>
  );
}
