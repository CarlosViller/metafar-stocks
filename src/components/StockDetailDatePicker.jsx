import { FormControl } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";

export default function StockDetailDatePicker({
  historicDates,
  setHistoricDates,
}) {
  return (
    <FormControl  className="historic-date-pickers">
      <DateTimePicker
        label="Desde"
        value={historicDates.from}
        onChange={(newValue) =>
          setHistoricDates({ ...historicDates, from: newValue })
        }
      />
      <DateTimePicker
        label="Hasta"
        value={historicDates.to}
        onChange={(newValue) =>
          setHistoricDates({ ...historicDates, to: newValue })
        }
      />
    </FormControl>
  );
}
