import { CircularProgress, FormControl, MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StockDetailHeader from "./StockDetailHeader";
import StockDetailDatePicker from "./StockDetailDatePicker";
import ChartTypeSelection from "./ChartTypeSelection";

export default function StockDetail() {
  const [stock, setStock] = useState();
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState("tiempo real");
  const [interval, setInterval] = useState("5m");
  const [historicDates, setHistoricDates] = useState({
    from: dayjs(),
    to: dayjs(),
  });

  const { symbol } = useParams();
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
    <section id="stock-detail-container">
      <section style={{ width: "550px" }}>
        <StockDetailHeader stock={stock} />
        <FormControl fullWidth>
          <ChartTypeSelection
            chartType={chartType}
            setChartType={setChartType}
          />
          {chartType === "historico" && (
            <StockDetailDatePicker
              historicDates={historicDates}
              setHistoricDates={setHistoricDates}
            />
          )}
          <Select
            labelId="interval-label"
            id="interval-label-select"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          >
            <MenuItem value="1m">1m</MenuItem>
            <MenuItem value="5m">5m</MenuItem>
            <MenuItem value="15m">15m</MenuItem>
          </Select>
        </FormControl>
      </section>
      <section className="stock-graph-container"></section>
    </section>
  );
}
