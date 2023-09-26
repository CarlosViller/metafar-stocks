import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
        <MenuItem value="1min">1min</MenuItem>
        <MenuItem value="5min">5min</MenuItem>
        <MenuItem value="15min">15min</MenuItem>
      </Select>
    </FormControl>
  );
}
