// src/components/WeatherTicker.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WeatherTicker.css";
import { BASE_URL } from "../WeatherDashboard/WeatherDasboard";

interface WeatherTickerProps {
  cities: string[];
}

interface CityWeather {
  city: string;
  zipCode: string;
  temp: number;
}

const WeatherTicker: React.FC<WeatherTickerProps> = ({ cities }) => {
  const [cityWeathers, setCityWeathers] = useState<CityWeather[]>([]);

  useEffect(() => {
    const fetchWeatherForCities = async () => {
      const weathers: CityWeather[] = await Promise.all(
        cities.map(async (zipCode) => {
          const response = await axios.get(
            `${BASE_URL}/weather?zip=${zipCode}`
          );
          return {
            zipCode,
            city: response.data.name,
            temp: response.data.main.temp,
          };
        })
      );
      setCityWeathers(weathers);
    };

    fetchWeatherForCities();
  }, [cities]);

  return (
    <div className="weather-ticker">
      <h2>Weather Ticker</h2>
      {cityWeathers.length ? (
        <ul>
          {cityWeathers.map((cityWeather) => (
            <li key={cityWeather.city}>
              {cityWeather.city}: {cityWeather.temp}°C
            </li>
          ))}
        </ul>
      ) : (
        <p>Add a city to the ticker</p>
      )}
    </div>
  );
};

export default WeatherTicker;
