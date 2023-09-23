import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const theme = createTheme({
  palette: {
    primary: { main: "#ad4de8" },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
