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
import Error from "./Error";

function parseTimeInterval(t) {
  switch (t) {
    case "1min":
      return 60000;
    case "5min":
      return 300000;
    case "15min":
      return 900000;
    default:
      return 300000;
  }
}

// Una buena practica seria guardar la key en un archivo .env, ya que es un challange, la dejo aca por practicidad.
const API_KEY = "2cf36da53dc14a07860fd406140fba56 ";

export default function StockDetail() {
  const [stock, setStock] = useState();
  const [stockPrices, setStockPrices] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const [chartType, setChartType] = useState("tiempo real");
  const [timeInterval, setTimeInterval] = useState("5min");
  const [historicDates, setHistoricDates] = useState({
    from: dayjs(),
    to: dayjs(),
  });

  const { symbol } = useParams();

  useEffect(() => {
    function fetchAPI() {
      fetch(
        `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${timeInterval}&apikey=${API_KEY}&source=docs&outputsize=15`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          return res.json();
        })
        .then((data) => {
          setStock(data.meta);
          setStockPrices(data.values.reverse());
          setError(false);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => setLoading(false));
    }

    fetchAPI();

    const id = setInterval(fetchAPI, parseTimeInterval(timeInterval));

    return () => {
      clearInterval(id);
    };
  }, [symbol, timeInterval]);

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

  if (error) {
    return <Error />;
  }

  if (loading) {
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
          <SelectInterval
            timeInterval={timeInterval}
            setTimeInterval={setTimeInterval}
          />
        </section>
        <section className="stock-graph-container">
          {stockPrices && (
            <HighchartsReact highcharts={Highcharts} options={options} />
          )}
        </section>
      </section>
    </>
  );
}
