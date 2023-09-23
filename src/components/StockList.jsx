import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function StockList({ stocks }) {
  if (stocks.length === 0) {
    return <h1 id="no-results">No results</h1>;
  }
  
  return (
    <section>
      <TableContainer component={Paper}>
        <Table aria-label="stock list table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "1em" }}>Símbolo</TableCell>
              <TableCell sx={{ fontSize: "1em" }}>Nombre</TableCell>
              <TableCell sx={{ fontSize: "1em" }}>Moneda</TableCell>
              <TableCell sx={{ fontSize: "1em" }}>Tipo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((stock, i) => (
              <TableRow
                key={`${stock.symbol}-${i}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.currency}</TableCell>
                <TableCell>{stock.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}
