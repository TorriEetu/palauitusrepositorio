import React, { useState, useEffect } from "react";
import CountryData from "./components/CountryData";
import axios from "axios";
import Filter from "./components/Filter";

function App() {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    //Using v2 instead of v3 because of the all useless infomation that v3 has
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <Filter filter={newFilter} onChange={handleFilterChange}></Filter>
      <CountryData
        countries={countries}
        setCountries={setCountries}
        filter={newFilter}
      ></CountryData>
    </div>
  );
}

export default App;
