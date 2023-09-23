import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";

export default function SearchBar() {
  return (
    <div id="search-container">
      <section id="search-bar">
        <input type="text" />
        <Link to="/">
          <img width={25} src="/search-icon.svg" alt="search icon" />
        </Link>
      </section>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="name"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#ad4de8",
                  },
                }}
              />
            }
            label="Name"
          />
          <FormControlLabel
            value="symbol"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#ad4de8",
                  },
                }}
              />
            }
            label="Symbol"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
