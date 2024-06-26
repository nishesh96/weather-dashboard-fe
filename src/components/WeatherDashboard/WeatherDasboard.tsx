import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WeatherDashboard.css";

// export const BASE_URL = process.env.REACT_APP_WEATHER_API_BASE_URL;
export const BASE_URL = "https://weather-dashboard-server.vercel.app";

interface WeatherDashboardProps {
  zipCode: string;
}

interface WeatherData {
  place: string;
  temp: number;
  description: string;
}

const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ zipCode }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (zipCode && zipCode.length === 6) {
      const fetchWeather = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/weather?zip=${zipCode}`
          );
          setWeather({
            place: response.data.name,
            temp: response.data.main.temp,
            description: response.data.weather[0].description,
          });
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };

      fetchWeather();
    } else setWeather(null);
  }, [zipCode]);

  return (
    <div className="weather-dashboard">
      {weather ? (
        <div>
          <h2>Current Weather</h2>
          <p>Place: {weather.place}</p>
          <p>Temperature: {weather.temp}°C</p>
          <p>Condition: {weather.description}</p>
        </div>
      ) : (
        <p>Please enter a zip code to see the weather.</p>
      )}
    </div>
  );
};

export default WeatherDashboard;
