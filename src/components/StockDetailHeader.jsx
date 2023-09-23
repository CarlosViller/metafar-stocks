import { useTheme } from "@emotion/react";

export default function StockDetailHeader({ stock }) {
  const theme = useTheme();

  return (
    <section className="stock-detail-header">
      <h1 style={{ color: theme.palette.primary.main, fontSize: "3em" }}>
        {stock.symbol}
      </h1>
      <small>{stock.name}</small>
    </section>
  );
}
