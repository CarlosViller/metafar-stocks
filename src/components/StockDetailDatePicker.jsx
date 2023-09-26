import { FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

export default function StockDetailDatePicker({
  historicDates,
  setHistoricDates,
}) {
  return (
    <FormControl  className="historic-date-pickers">
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
    </FormControl>
  );
}
