import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CHART_TYPES } from "../constants";

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
        <MenuItem value={CHART_TYPES.tiempo_real}>Tiempo real</MenuItem>
        <MenuItem value={CHART_TYPES.historico}>Histórico</MenuItem>
      </Select>
    </FormControl>
  );
}
