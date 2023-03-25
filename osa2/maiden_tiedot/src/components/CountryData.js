import React from "react";
import Country from "./Country";

const CountryData = ({ countries, setCountries, filter }) => {
  const filtered = countries.filter((country) =>
    country.name.match(RegExp(filter, "i"))
  );

  if (filtered.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (
    (filtered.length > 1 && filtered.length < 10) ||
    filtered.length === 0
  ) {
    return (
      <ul>
        {filtered.map((filteredMaps) => (
          <li key={filteredMaps.name}>
            {" "}
            {filteredMaps.name}{" "}
            <button onClick={() => setCountries([filteredMaps])}>show</button>
          </li>
        ))}
      </ul>
    );
  } else {
    return <Country country={filtered[0]} />;
  }
};

export default CountryData;
