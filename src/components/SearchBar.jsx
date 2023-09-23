import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SearchBar() {
  const [type, setType] = useState("symbol");
  const [query, setQuery] = useState("");

  return (
    <div id="search-container">
      <section id="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Link to={`/search?type=${type}&q=${query}`}>
          <img width={25} src="/search-icon.svg" alt="search icon" />
        </Link>
      </section>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
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
        </RadioGroup>
      </FormControl>
    </div>
  );
}
