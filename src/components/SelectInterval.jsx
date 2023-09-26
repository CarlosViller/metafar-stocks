import { MenuItem, Select } from "@mui/base";

export default function SelectInterval({ interval, setInterval }) {
  return (
    <Select
      labelId="interval-label"
      id="interval-label-select"
      value={interval}
      onChange={(e) => setInterval(e.target.value)}
    >
      <MenuItem value="1min">1min</MenuItem>
      <MenuItem value="5min">5min</MenuItem>
      <MenuItem value="15min">15min</MenuItem>
    </Select>
  );
}
