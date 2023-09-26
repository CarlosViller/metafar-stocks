import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function ChartTypeSelection({ chartType, setChartType }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="chart-type">Tipo de gráfico</InputLabel>
      <Select
        labelId="chart-type"
        label="Tipo de gráfico"
        value={chartType}
        onChange={(e) => setChartType(e.target.value)}
      >
        <MenuItem value="tiempo real">Tiempo real</MenuItem>
        <MenuItem value="historico">Histórico</MenuItem>
      </Select>
    </FormControl>
  );
}
