import React, { useEffect, useState } from "react";
import WeatherDashboard from "./components/WeatherDashboard/WeatherDasboard";
import WeatherTicker from "./components/WeatherTicker/WeatherTicker";
import "./App.css";

interface City {
  name: string;
  zipCode: string;
}

const App: React.FC = () => {
  const [zipCode, setZipCode] = useState("");
  const [cities, setCities] = useState<string[]>([]);

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(event.target.value);
  };

  const handleAddCity = () => {
    if (zipCode && cities.length < 3) {
      setCities([zipCode, ...cities]);
    }
  };

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <p>Get weather forcast for indian cities </p>
      <div className="input-container">
        <input
          type="text"
          value={zipCode}
          onChange={handleZipCodeChange}
          placeholder="Enter zip code"
          maxLength={6}
        />
        <button onClick={handleAddCity}>Add to Ticker</button>
      </div>

      <WeatherDashboard zipCode={zipCode} />
      <WeatherTicker cities={cities} />
    </div>
  );
};

export default App;
