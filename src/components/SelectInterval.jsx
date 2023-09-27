import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { TIME_INTERVALS } from "../constants";

export default function SelectInterval({ timeInterval, setTimeInterval }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="interval-label">Intervalo</InputLabel>
      <Select
        labelId="interval-label"
        label="Intervalo"
        value={timeInterval}
        onChange={(e) => setTimeInterval(e.target.value)}
      >
        <MenuItem value={TIME_INTERVALS["1min"]}>
          {TIME_INTERVALS["1min"]}
        </MenuItem>
        <MenuItem value={TIME_INTERVALS["5min"]}>
          {TIME_INTERVALS["5min"]}
        </MenuItem>
        <MenuItem value={TIME_INTERVALS["15min"]}>
          {TIME_INTERVALS["15min"]}
        </MenuItem>
      </Select>
    </FormControl>
  );
}
