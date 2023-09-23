import { DatePicker } from "@mui/x-date-pickers";

export default function StockDetailDatePicker({
  historicDates,
  setHistoricDates,
}) {
  return (
    <section className="historic-date-pickers">
      <DatePicker
        label="Desde"
        value={historicDates.from}
        onChange={(newValue) =>
          setHistoricDates({ ...historicDates, from: newValue })
        }
      />
      <DatePicker
        label="Hasta"
        value={historicDates.to}
        onChange={(newValue) =>
          setHistoricDates({ ...historicDates, to: newValue })
        }
      />
    </section>
  );
}
