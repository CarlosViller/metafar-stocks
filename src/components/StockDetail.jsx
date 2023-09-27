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
import {
  API_ENDPOINT,
  API_KEY,
  CHART_TYPES,
  TIME_INTERVALS,
} from "../constants";
import Loading from "./Loading";

/**
 * Devuelve la conversion en milisegundos de los intervalos de tiempo posibles para renderizar el gráfico.
 * @param { string } t
 * @returns {number}
 */
function parseTimeInterval(t) {
  switch (t) {
    case TIME_INTERVALS["1min"]:
      return 60000;
    case TIME_INTERVALS["5min"]:
      return 300000;
    case TIME_INTERVALS["15min"]:
      return 900000;
    default:
      return 300000;
  }
}

/**
 * Devuelve la fecha y hora de un formato ISO
 *
 * Ejemplo: 2023-09-26T21:08:18.323Z => 2023-09-26 21:08:18
 *
 * @param { {from: dayjs.Dayjs, to: dayjs.Dayjs} } historicDates
 * @returns { [string, string] }
 */
function getISODates(historicDates) {
  const fromISO = historicDates.from.$d.toISOString().split("T");
  const toISO = historicDates.to.$d.toISOString().split("T");
  return [
    `${fromISO[0]} ${fromISO[1].split(".")[0]}`,
    `${toISO[0]} ${toISO[1].split(".")[0]}`,
  ];
}

// Por defecto, la fecha de inicio del gráfico por fechas sera un mes atrás a partir de la fecha actual.
const initialDate = new Date();
initialDate.setMonth(initialDate.getMonth() - 1);

export default function StockDetail() {
  const [stock, setStock] = useState();
  const [stockPrices, setStockPrices] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [chartType, setChartType] = useState(CHART_TYPES.tiempo_real);
  const [timeInterval, setTimeInterval] = useState(TIME_INTERVALS["5min"]);
  const [dates, setDates] = useState({
    from: dayjs(initialDate),
    to: dayjs(),
  });

  const { symbol } = useParams();

  function fetchAPI(url) {
    setLoading(true);
    fetch(url)
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

  useEffect(() => {
    let id = "";

    if (chartType === CHART_TYPES.tiempo_real) {
      const fetchRealtime = () => {
        fetchAPI(
          `${API_ENDPOINT}/time_series?symbol=${symbol}&interval=${timeInterval}&apikey=${API_KEY}&source=docs&outputsize=15`
        );
      };

      fetchRealtime();

      id = setInterval(fetchRealtime, parseTimeInterval(timeInterval));
    } else {
      const [fromDate, toDate] = getISODates(dates);

      fetchAPI(
        `${API_ENDPOINT}/time_series?symbol=${symbol}&interval=${timeInterval}&apikey=${API_KEY}&source=docs&start_date=${fromDate}&end_date=${toDate}`
      );
    }

    return () => {
      clearInterval(id);
    };
  }, [chartType, dates, symbol, timeInterval]);

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

  // Primer render
  if (loading && !stock && !stockPrices) {
    return <Loading />;
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
          {chartType === CHART_TYPES.historico && (
            <StockDetailDatePicker dates={dates} setDates={setDates} />
          )}
          <SelectInterval
            timeInterval={timeInterval}
            setTimeInterval={setTimeInterval}
          />
        </section>
        <section className="stock-graph-container">
          {stockPrices && !loading ? (
            <HighchartsReact highcharts={Highcharts} options={options} />
          ) : (
            <Loading />
          )}
        </section>
      </section>
    </>
  );
}
