import { CircularProgress, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function StockDetail() {
  const [stock, setStock] = useState();
  const [loading, setLoading] = useState(true);
  const { symbol } = useParams();
  const theme = useTheme();

  useEffect(() => {
    fetch(
      `https://api.twelvedata.com/stocks?symbol=${symbol}&source=docs&country=US`
    )
      .then((res) => res.json())
      .then(({ data }) => setStock(data[0]))
      .finally(() => setLoading(false));
  }, [symbol]);

  if (loading)
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );

  return (
    <section>
      <section className="stock-detail-header">
        <h1 style={{ color: theme.palette.primary.main, fontSize: "3em" }}>
          {stock.symbol}
        </h1>
        <small>{stock.name}</small>
      </section>
    </section>
  );
}
