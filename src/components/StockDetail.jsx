import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import StockDetailHeader from "./StockDetailHeader";
import StockDetailDatePicker from "./StockDetailDatePicker";
import ChartTypeSelection from "./ChartTypeSelection";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import SelectInterval from "./SelectInterval";

// Una buena practica seria guardar la key en un archivo .env, ya que es un challange, la dejo aca por practicidad.
const API_KEY = "2cf36da53dc14a07860fd406140fba56";

export default function StockDetail() {
  const [stock, setStock] = useState();
  const [loading, setLoading] = useState(true);
  const [stockPrices, setStockPrices] = useState();
  const [chartType, setChartType] = useState("tiempo real");
  const [interval, setInterval] = useState("5min");
  const [historicDates, setHistoricDates] = useState({
    from: dayjs(),
    to: dayjs(),
  });

  const { symbol } = useParams();

  useEffect(() => {
    fetch(
      `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${API_KEY}&source=docs&outputsize=15`
    )
      .then((res) => res.json())
      .then((data) => {
        setStock(data.meta);
        setStockPrices(data.values.reverse());
      })
      .finally(() => setLoading(false));
  }, [interval, symbol]);

  const options = useMemo(() => {
    if (!stockPrices || !stock) return null;

    return {
      title: "",
      xAxis: {
        categories: stockPrices.map((value) => {
          const date = new Date(value.datetime);
          const hour = date.getHours();
          const minutes = date.getMinutes();
          
          // Formatea valores como '5' a '05' para encajar con el formato de hora
          return `${hour}:${minutes < 10 ? "0" + minutes : minutes}`;
        }),
      },
      yAxis: {
        title: {
          text: stock.currency,
        },
      },
      series: [
        {
          name: symbol,
          data: stockPrices.map((value) => Number(value.open)),
        },
      ],
    };
  }, [stock, stockPrices, symbol]);

  if (loading || !stock) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <StockDetailHeader stock={stock} />
      <section id="stock-detail-container">
        <section className="chart-options">
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
          <SelectInterval interval={interval} setInterval={setInterval} />
        </section>
        <section className="stock-graph-container">
          {stockPrices && stock && (
            <HighchartsReact highcharts={Highcharts} options={options} />
          )}
        </section>
      </section>
    </>
  );
}
