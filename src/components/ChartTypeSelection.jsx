import { MenuItem, Select } from "@mui/material";

export default function ChartTypeSelection({ chartType, setChartType }) {
  return (
    <Select
      sx={{ marginBottom: 3 }}
      labelId="interval-label"
      value={chartType}
      onChange={(e) => setChartType(e.target.value)}
    >
      <MenuItem value="tiempo real">Tiempo real</MenuItem>
      <MenuItem value="historico">Historico</MenuItem>
    </Select>
  );
}
