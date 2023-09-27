import { FormControl } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";

export default function StockDetailDatePicker({ dates, setDates }) {
  return (
    <FormControl
      sx={{
        display: "flex",
        gap: "10px",
        justifyContent: "space-between",
      }}
    >
      <DateTimePicker
        label="Desde"
        value={dates.from}
        onChange={(newValue) => setDates({ ...dates, from: newValue })}
      />
      <DateTimePicker
        label="Hasta"
        value={dates.to}
        onChange={(newValue) => setDates({ ...dates, to: newValue })}
      />
    </FormControl>
  );
}
